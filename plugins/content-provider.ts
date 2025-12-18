import { readdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import * as mdx from '@mdx-js/mdx'

interface VirtualModule {
  id: string
  resolvedId: string
  loadResult: string
}

function createVirtualModule(id: string, loader: () => string): VirtualModule {
  let cachedLoadResult: string | undefined
  return {
    id: 'virtual:' + id,
    resolvedId: '\0virtual:' + id,
    get loadResult() {
      if (cachedLoadResult) {
        return cachedLoadResult
      }
      cachedLoadResult = loader()
      return cachedLoadResult
    },
  }
}

function createFileMapVirtualModule(
  id: string,
  basePath: string,
  filenames: string[],
) {
  return createVirtualModule(id, () => {
    let code = 'const fileMap = {'
    for (const filename of filenames) {
      const name = path.parse(filename).name
      const filePath = path.resolve(basePath, filename)
      code += `get ['${name}']() { return import('${filePath}') },`
    }
    code += '};'
    code += 'export default fileMap;'
    return code
  })
}

function parseMetadataFromMdx(filePath: string): PostMetadata {
  const buffer = readFileSync(filePath)
  const compiledBody = mdx
    .compileSync(buffer, {
      outputFormat: 'function-body',
    })
    .value.toString()
  const compiledFunction = new Function(compiledBody)
  const { metadata } = compiledFunction({})
  return metadata
}

function createContentProvider(
  pluginName: string,
  virtualModules: VirtualModule[],
): Plugin {
  const resolvedIds: Record<string, string> = {}
  const virtualModuleMap: Record<string, VirtualModule> = {}

  for (const virtualModule of virtualModules) {
    resolvedIds[virtualModule.id] = virtualModule.resolvedId
    virtualModuleMap[virtualModule.resolvedId] = virtualModule
  }

  return {
    name: pluginName,
    resolveId(id) {
      return resolvedIds[id]
    },
    load(id) {
      const virtualModule = virtualModuleMap[id]
      if (virtualModule) {
        return virtualModule.loadResult
      }
      return undefined
    },
  }
}

export function postProvider(postsPath: string): Plugin {
  // 如果目录不存在或为空，返回空数据
  if (!existsSync(postsPath)) {
    return createContentProvider('post-provider-plugin', [
      createVirtualModule('posts', () => 'export default {};'),
      createVirtualModule('postIndex', () => 'export default [];'),
    ])
  }

  const postFilenames = readdirSync(postsPath).filter((f) => f.endsWith('.mdx'))

  if (postFilenames.length === 0) {
    return createContentProvider('post-provider-plugin', [
      createVirtualModule('posts', () => 'export default {};'),
      createVirtualModule('postIndex', () => 'export default [];'),
    ])
  }

  const postsVirtualModule = createFileMapVirtualModule(
    'posts',
    postsPath,
    postFilenames,
  )
  const postIndexVirtualModule = createVirtualModule('postIndex', () => {
    const metadataList: PostMetadata[] = []
    for (const filename of postFilenames) {
      const postPath = path.resolve(postsPath, filename)
      const metadata = parseMetadataFromMdx(postPath)
      metadata.slug = path.parse(filename).name
      metadata.date = new Date(metadata.date!)
      metadataList.push(metadata)
    }
    metadataList.sort((a, b) => +b.date! - +a.date!)
    return 'export default ' + JSON.stringify(metadataList)
  })

  return createContentProvider('post-provider-plugin', [
    postsVirtualModule,
    postIndexVirtualModule,
  ])
}

export function pageProvider(pagesPath: string): Plugin {
  // 如果目录不存在或为空，返回空数据
  if (!existsSync(pagesPath)) {
    return createContentProvider('page-provider-plugin', [
      createVirtualModule('pages', () => 'export default {};'),
    ])
  }

  const pageFilenames = readdirSync(pagesPath).filter((f) => f.endsWith('.mdx'))

  if (pageFilenames.length === 0) {
    return createContentProvider('page-provider-plugin', [
      createVirtualModule('pages', () => 'export default {};'),
    ])
  }

  const pagesVirtualModule = createFileMapVirtualModule(
    'pages',
    pagesPath,
    pageFilenames,
  )

  return createContentProvider('page-provider-plugin', [pagesVirtualModule])
}
