import fs from 'node:fs'
import sharp from 'sharp'
import * as blurhash from 'blurhash'

const argv = process.argv
if (argv.length < 3) {
  console.error('Usage: pnpm process-img <input> [<title>]')
  process.exit(1)
}

const input = argv[2]
const title = argv[3]
const inputBuffer = fs.readFileSync(input)

const image = sharp(inputBuffer)

const { width, height } = await image.metadata()

if (!width || !height) {
  console.error('Could not read image dimensions')
  process.exit(1)
}

const pixelBuffer = await image.ensureAlpha().raw().toBuffer()
const blurhashString = blurhash.encode(
  new Uint8ClampedArray(pixelBuffer),
  width,
  height,
  4,
  3,
)
process.stdout.write(`${title || ''};${width}x${height};${blurhashString}\n`)
