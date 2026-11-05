// Complete preview copy, rendered in both languages without client-side selection.
export type PrivacySegment = string | { text: string; href: string }

interface PrivacyLocale {
  id: 'zh' | 'en'
  lang: 'zh-CN' | 'en'
  title: string
  preview: string
  intro: string
  sections: { heading: string; paragraphs: PrivacySegment[][] }[]
}

export const soonerPrivacyMetadata = {
  title: '趁鲜隐私政策 / Sooner Privacy Policy',
  description:
    '趁鲜隐私政策预览：本机数据、条码查询、可选 AI、反馈与服务商保留。Sooner privacy preview: local data, barcode lookup, optional AI, feedback, and provider retention.',
  url: 'https://zaxh.org/sooner/privacy',
}

export const soonerPrivacyContent: PrivacyLocale[] = [
  {
    id: 'zh',
    lang: 'zh-CN',
    title: '趁鲜隐私政策',
    preview: '预览稿 · 尚未生效',
    intro: '简单说：趁鲜不需要账号。食物清单和历史保存在手机上；条码查询会联网；只有你同意使用 AI 时，照片或提问所需的内容才会交给 AI 服务。你主动发送的反馈也会上传。下面分别说明这些数据去哪里、用来做什么，以及怎样停止发送或清除。',
    sections: [
      {
        heading: '适用范围',
        paragraphs: [
          [
            '本政策说明趁鲜 iPhone App（英文名 Sooner，包括 TestFlight 测试版）及其相关服务如何处理信息。有些功能只在部分版本里有。本隐私网页本身使用的服务另列在下方。',
          ],
        ],
      },
      {
        heading: '保存在手机上的数据',
        paragraphs: [
          [
            '食物名字、份数、存放位置、到期日、照片、历史记录，以及记住的条码和名称，保存在 App 的本机数据库中。文字识别、食物分类和条码识别在手机上完成。把食物标为「吃完」或「扔掉」会留下本机历史记录，不等于删除它。',
          ],
          [
            '趁鲜没有账号或 App 自己的云同步。若你使用 iCloud 设备备份或电脑备份，App 数据可能随系统备份保存；这些备份我们看不到。',
          ],
        ],
      },
      {
        heading: '相机与提醒',
        paragraphs: [
          [
            '相机用于录入食物、识别条码和日期。App 在你打开相机时请求权限；不允许相机也可以打字添加。到期提醒在手机上生成，不经过我们的服务器；你可以拒绝通知或在 iOS 设置中关闭。App 不请求定位、通讯录或麦克风权限，也不会把拍摄的照片自动存入系统相册。',
          ],
        ],
      },
      {
        heading: '条码查询',
        paragraphs: [
          [
            '查询商品名时，App 把条码数字发送给我们的服务器；这次查询不附上食物清单或设备标识。服务器先查缓存，未命中时查询极速数据（阿里云市场），必要时再查询 Open Food Facts，只取得商品名称和品牌。我们发给这两家服务的查询内容是条码数字，不是你的照片或清单。',
          ],
          [
            '服务器缓存条码对应的名称和品牌：查到结果保存 180 天，查不到的结果保存 14 天；这些缓存不与某个人或设备关联。网络请求本身也会产生 IP 地址等连接信息，见下方服务商说明。',
            {
              text: 'Open Food Facts 隐私政策',
              href: 'https://world.openfoodfacts.org/privacy',
            },
            '。',
          ],
        ],
      },
      {
        heading: '你选择使用的 AI',
        paragraphs: [
          [
            '「用 AI」默认关闭，App 会先征求同意，同一张同意页说明照片、问题和相关食物清单会怎样发送。你可以选择「先不用」，或随时在 App 设置中关闭；关闭后首页不显示「问趁鲜」，也不再发送新的 AI 请求。不使用 AI 不影响手动添加和手机上的识别。如果你在旧版本里只同意过发送照片，第一次使用「问趁鲜」时会再征求一次同意。',
          ],
          [
            '开着「用 AI」时，你拍摄并提交的照片（包括小票）会发给 AI 识别。使用「问趁鲜」时，会发送问题、相关食物的名字、份数、存放位置、到期日和日期是否待确认、最近几轮对话及手机上的当天日期，用来识别和回答。「用 AI」关闭时，照片只在手机上识别，不会发出。当天次数用完时，我们的服务器不会再把照片转给 AI，App 改在手机上识别。AI 没有及时回复时，App 也会改在手机上识别，但已经发出的照片仍可能由相关服务处理。',
          ],
          [
            'AI 照片发送前缩到最长边 1024 像素并重新压成 JPEG，不保留照片中的拍摄地点等元数据；图片里直接可见的信息仍会一起发送，拍的时候避开不想给人看的东西。',
          ],
          [
            '这些内容经过我们由 AirBuild 托管的服务器、AirBuild 的 AI 转发服务 AirRouter、OpenRouter，再交给 Google Vertex AI 上的 Gemini 模型处理，不会改走其他通道；不是手机直接发给 Google。设备标识不会随 AI 内容发给 Google。',
          ],
          [
            '我们的服务器不会把这些照片、问题、相关清单和回答写入服务器数据库，也不主动记录内容日志。这不代表经由的服务商完全不留存；托管平台可能处理请求和错误日志。服务商的处理范围与规则见下一节。',
          ],
        ],
      },
      {
        heading: 'AI 服务商的处理与保留',
        paragraphs: [
          [
            'AirBuild、OpenRouter 和 Google 按各自条款处理转交的数据。AirBuild 会记录每次 AI 调用的用量和费用；内容怎样保留，以 AirBuild 的隐私政策为准。',
            {
              text: 'AirBuild 隐私政策',
              href: 'https://air.build/privacy/',
            },
            '。',
          ],
          [
            'OpenRouter 的说明是默认不保存提示和回答，但可选日志设置和安全处理会影响保留；被标为疑似儿童性虐待内容的信息可能为人工审核、报告或法律要求保留。它还记录用量、延迟等请求信息。',
            {
              text: 'OpenRouter 隐私政策',
              href: 'https://openrouter.ai/privacy',
            },
            '；',
            {
              text: '数据处理说明',
              href: 'https://openrouter.ai/docs/guides/privacy/data-collection',
            },
            '。',
          ],
          [
            'OpenRouter 对 Google Vertex AI 的说明是不用于训练，但安全检查标记的提示可能为防滥用保留最多 90 天。Google 也说明，模型缓存可能保留至 24 小时，部分模型支持把派生缓存写入存储。所以 Google 那边不是完全不留。',
            {
              text: 'OpenRouter 的服务商规则',
              href: 'https://openrouter.ai/docs/guides/privacy/provider-logging',
            },
            '；',
            {
              text: 'Google 安全保留说明',
              href: 'https://openrouter.ai/docs/guides/features/zdr',
            },
            '；',
            {
              text: 'Google 数据治理说明',
              href: 'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/data-governance',
            },
            '。',
          ],
        ],
      },
      {
        heading: '设备验证与每日次数',
        paragraphs: [
          [
            '使用 AI 时，App 使用 Apple 的 App Attest 验证请求来自真正的趁鲜和真实设备，防止重复请求及滥用，并计算每天的使用次数。每次安装会生成一把验证密钥；它的编号不是手机序列号，重新安装会更换。请求还带有一次性校验码和 Apple 签名。',
          ],
          [
            '服务器保存密钥编号、公钥、校验计数器、运行环境和创建时间等验证记录。连续 90 天没有使用的设备密钥及相关记录会被自动删除；服务器每天检查一次，所以实际删除最多可能比满 90 天晚一天左右。按天统计的次数记录会自动清理两天前及更早的记录。停止使用后，验证记录要到上述期限才会删除；若想提前删除，请用下方邮箱联系我们，我们会说明可处理的范围。只凭邮箱地址，我们通常找不到对应的设备记录。',
          ],
        ],
      },
      {
        heading: '你主动发送的反馈',
        paragraphs: [
          [
            '只有在 App 设置中点「发送」时，反馈才会交给 AirBuild 的 AirFeedback 保存，供开发者处理问题。反馈包括你写的文字、自己选择的图片（最多 4 张）、App 版本、机型、系统版本、语言和地区。图片会重新压缩，不附带原照片的拍摄地点等元数据。',
          ],
          [
            'App 不自动附上食物清单、设备标识或联系方式，但文字和图片里可能有你自行提供的个人信息。发送前请检查，不要提供密码、验证码或不想分享的内容。若你通过邮件联系，我们也会收到你主动发送的邮件地址和正文。',
          ],
          [
            '目前没有设定反馈的自动删除期限。想删除某条反馈，请发邮件到 ',
            {
              text: 'i@xingbest.fun',
              href: 'mailto:i@xingbest.fun',
            },
            '，提供大概发送时间和足以定位该条反馈的内容；我们会联系平台尽力处理，但不能保证平台一定能删除或承诺完成时间。',
          ],
        ],
      },
      {
        heading: '服务商、权限与清除',
        paragraphs: [
          [
            '提供上述功能时，AirBuild 处理托管、AI 转发和反馈；OpenRouter 与 Google 处理 AI 内容；极速数据和 Open Food Facts 处理条码查询；Apple 的 App Attest 用于验证 App 和设备。网络连接会向接收方暴露 IP 地址等技术信息。托管平台可能处理请求网址、时间及错误等日志；我们的 App 服务器代码不主动读取或保存 IP 地址。服务可能在你所在国家或地区以外处理信息。',
          ],
          [
            'App 没有另接广告、使用分析、崩溃上报或购买上报服务。Apple 根据你自己的设置处理 App Store、TestFlight 和系统诊断信息，这是 Apple 的渠道，不是 App 另加的上报。',
            {
              text: 'Apple 隐私政策',
              href: 'https://www.apple.com/legal/privacy/',
            },
            '；',
            {
              text: 'TestFlight 隐私说明',
              href: 'https://www.apple.com/legal/privacy/data/en/test-flight/',
            },
            '。',
          ],
          [
            '你可以在 App 设置中关闭「用 AI」、不再发送反馈，并在 iOS 设置中撤回相机和通知权限。撤回后不再进行依赖该同意的新操作，不会撤回已经发给服务商的数据。卸载 App 会移除本机的 App 数据；已有系统备份由你的备份设置控制。App 内目前没有一键清空全部数据的功能，也没有需要注销的账号。',
          ],
        ],
      },
      {
        heading: '本隐私网页',
        paragraphs: [
          [
            '本网页托管在 Cloudflare，沿用 zaxh.org 的 ',
            {
              text: 'Cloudflare Web Analytics',
              href: 'https://www.cloudflare.com/web-analytics/',
            },
            ' 网页访问量及性能统计和 ',
            {
              text: 'Google Fonts',
              href: 'https://developers.google.com/fonts/faq/privacy',
            },
            ' 字体服务。打开网页时，这些服务会处理网络请求，包括 IP 地址、浏览器和所请求页面等技术信息。本网页不会读取趁鲜 App 内的食物清单。',
          ],
        ],
      },
      {
        heading: '更新与联系',
        paragraphs: [
          [
            '本政策变更时会更新此页日期。隐私问题，以及访问、更正或删除信息的请求，请联系 ',
            {
              text: 'i@xingbest.fun',
              href: 'mailto:i@xingbest.fun',
            },
            '。我们会核实请求和可定位的信息，说明可处理的范围；本机资料由你控制，服务商已保留的信息还受其规则和法律要求约束。不要发来密码或其他敏感信息。',
          ],
        ],
      },
    ],
  },
  {
    id: 'en',
    lang: 'en',
    title: 'Sooner Privacy Policy',
    preview: 'Preview · Not yet effective',
    intro: 'In short: Sooner does not require an account. Your food list and history stay on your phone. Barcode lookup uses the internet. Photos or information needed for a question go to AI services only when you consent to using AI. Feedback you choose to send is also uploaded. This policy explains where that information goes, why it is used, and how to stop sending or remove it.',
    sections: [
      {
        heading: 'Scope',
        paragraphs: [
          [
            'This policy describes how the Sooner iPhone app (趁鲜 in Chinese, including TestFlight builds) and its related services handle information. Some features are only in some versions. The services used by this privacy webpage are described separately below.',
          ],
        ],
      },
      {
        heading: 'Data on your phone',
        paragraphs: [
          [
            'Food names, quantities, storage locations, expiry dates, photos, history, and remembered barcodes and names are stored in the app\'s local database. Text recognition, food classification, and barcode recognition run on your phone. Marking food as eaten or thrown away keeps a local history entry; it does not delete that entry.',
          ],
          [
            'Sooner has no account or app-operated cloud sync. If you use iCloud device backups or computer backups, app data may be included in those system backups. We can\'t see those backups.',
          ],
        ],
      },
      {
        heading: 'Camera and reminders',
        paragraphs: [
          [
            'The camera is used to add food and read barcodes and dates. The app asks for camera access when you open the camera. You can add food by typing if you decline. Expiry reminders are generated on your phone, not sent through our server. You can decline notifications or turn them off in iOS Settings. The app does not request location, contacts, or microphone access, and does not automatically save photos to your system photo library.',
          ],
        ],
      },
      {
        heading: 'Barcode lookup',
        paragraphs: [
          [
            'To look up a product name, the app sends the barcode number to our server without your food list or device ID. The server checks its cache, then queries 极速数据 (Jisu Data, through Alibaba Cloud Marketplace) and, when needed, Open Food Facts for the product name and brand. The query content we send to these two services is the barcode number, not your photos or food list.',
          ],
          [
            'The server caches barcode-to-name and brand results for 180 days, or an unsuccessful lookup for 14 days. These cache entries are not linked to a person or device. Network connections also expose technical information such as IP addresses, as explained below. ',
            {
              text: 'Open Food Facts Privacy Policy',
              href: 'https://world.openfoodfacts.org/privacy',
            },
            '.',
          ],
        ],
      },
      {
        heading: 'AI you choose to use',
        paragraphs: [
          [
            'Use AI is off by default, and the app asks for your consent first. One consent screen explains how photos, questions, and the related food list are sent. You can choose Not Now, or turn it off at any time in the app\'s settings. Turning it off hides Ask Sooner on the home screen and stops new AI requests. You can still add food manually and use on-device recognition. If you agreed only to sending photos in an earlier version, the app asks again before you first use Ask Sooner.',
          ],
          [
            'With Use AI on, photos you take and submit, including receipts, are sent to AI to read. Using Ask Sooner sends the question, relevant food names, quantities, storage locations, expiry dates and whether dates need confirmation, recent conversation turns, and the current date on your phone to read and answer. When Use AI is off, photos are read on your phone only and are not sent. When today\'s AI reads are used up, our server no longer passes photos to AI, and the app reads them on your phone. If AI does not answer in time, the app also reads them on your phone, but photos already sent may still be processed by the services involved.',
          ],
          [
            'Before upload, AI photos are resized to a maximum dimension of 1024 pixels and re-encoded as JPEG without metadata such as the capture location. Information visible in the image is still sent. Keep anything you don\'t want to share out of the shot.',
          ],
          [
            'This content passes through our AirBuild-hosted server, AirBuild\'s AirRouter AI relay, and OpenRouter before reaching Google\'s Gemini models on Google Vertex AI. Requests are not routed to any other provider. It is not sent directly from your phone to Google. The device ID is not sent to Google with AI content.',
          ],
          [
            'Our server does not save these photos, questions, relevant food lists, or answers in a server-side database or actively record content logs. This does not mean every service in the chain retains nothing; hosting infrastructure may process request and error logs. The next section describes the providers\' rules.',
          ],
        ],
      },
      {
        heading: 'AI providers and retention',
        paragraphs: [
          [
            'AirBuild, OpenRouter, and Google process forwarded data under their respective terms. AirBuild records usage and cost for each AI call; how it keeps content is governed by AirBuild\'s Privacy Policy. ',
            {
              text: 'AirBuild Privacy Policy',
              href: 'https://air.build/privacy/',
            },
            '.',
          ],
          [
            'OpenRouter states that it does not store prompts and responses by default, but optional logging settings and safety processing affect retention. Content flagged as potential child sexual abuse material may be retained for human review, reporting, or legal requirements. OpenRouter also records request information such as usage and latency. ',
            {
              text: 'OpenRouter Privacy Policy',
              href: 'https://openrouter.ai/privacy',
            },
            '; ',
            {
              text: 'data collection',
              href: 'https://openrouter.ai/docs/guides/privacy/data-collection',
            },
            '.',
          ],
          [
            'For Google Vertex AI, OpenRouter states that data is not used for training, but prompts flagged by safety checks may be retained for up to 90 days to prevent abuse. Google also describes model caching for up to 24 hours, including durable storage of derived cache data on supported models. So Google may keep some data for a limited time. ',
            {
              text: 'OpenRouter provider policies',
              href: 'https://openrouter.ai/docs/guides/privacy/provider-logging',
            },
            '; ',
            {
              text: 'Google safety retention',
              href: 'https://openrouter.ai/docs/guides/features/zdr',
            },
            '; ',
            {
              text: 'Google data governance',
              href: 'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/data-governance',
            },
            '.',
          ],
        ],
      },
      {
        heading: 'Device verification and daily limits',
        paragraphs: [
          [
            'For AI requests, the app uses Apple\'s App Attest to verify that requests come from the genuine Sooner app and a real device, prevent replay and abuse, and count daily uses. Each installation creates a verification key. Its ID is not your phone\'s serial number and changes if you reinstall. Requests also include a one-time challenge and an Apple signature.',
          ],
          [
            'The server stores verification records including the key ID, public key, verification counter, environment, and creation time. Device keys and related records that go unused for 90 days are deleted automatically. The server checks once a day, so deletion may happen up to about a day after the 90 days are up. Daily usage records from two days ago and earlier are cleaned up automatically. If you stop using the app, these records are deleted on that schedule. To ask for earlier deletion, email us; we will explain what we can process. An email address alone usually isn\'t enough for us to find your device record.',
          ],
        ],
      },
      {
        heading: 'Feedback you choose to send',
        paragraphs: [
          [
            'Feedback is uploaded only when you tap Send in the app\'s settings. AirBuild\'s AirFeedback stores it for the developer to investigate problems. It includes your message, images you select (up to four), app version, device model, OS version, language, and region. Images are re-encoded without metadata such as their original capture location.',
          ],
          [
            'The app does not automatically attach your food list, device ID, or contact details. Your message or images may still contain personal information you include. Review them before sending, and do not send passwords, verification codes, or anything you do not want to share. If you contact us by email, we also receive the email address and message you choose to send.',
          ],
          [
            'Feedback currently has no automatic deletion period. To request deletion of an item, email ',
            {
              text: 'i@xingbest.fun',
              href: 'mailto:i@xingbest.fun',
            },
            ' with its approximate submission time and enough content to locate it. We will contact the platform and try to help, but cannot guarantee that the platform can delete it or promise a completion time.',
          ],
        ],
      },
      {
        heading: 'Providers, permissions, and removal',
        paragraphs: [
          [
            'AirBuild handles hosting, AI relay, and feedback; OpenRouter and Google process AI content; Jisu Data and Open Food Facts handle barcode lookup; and Apple\'s App Attest verifies the app and device. Network connections expose technical information such as IP addresses to their recipients. Hosting infrastructure may process request URLs, times, and error logs. Our app server code does not actively read or store IP addresses. Services may process information outside your country or region.',
          ],
          [
            'The app does not add advertising, usage analytics, crash-reporting, or purchase-reporting services. Apple handles App Store, TestFlight, and system diagnostic information according to your own settings through Apple\'s channels, rather than additional reporting built into this app. ',
            {
              text: 'Apple Privacy Policy',
              href: 'https://www.apple.com/legal/privacy/',
            },
            '; ',
            {
              text: 'TestFlight privacy information',
              href: 'https://www.apple.com/legal/privacy/data/en/test-flight/',
            },
            '.',
          ],
          [
            'You can turn off Use AI in the app, stop sending feedback, and revoke camera or notification access in iOS Settings. This stops new actions that depend on your consent, but does not recall data already sent to providers. Uninstalling removes local app data; existing system backups remain under your backup settings. There is currently no clear-all-data control in the app and no account to close.',
          ],
        ],
      },
      {
        heading: 'This privacy webpage',
        paragraphs: [
          [
            'This webpage is hosted on Cloudflare and uses zaxh.org\'s existing ',
            {
              text: 'Cloudflare Web Analytics',
              href: 'https://www.cloudflare.com/web-analytics/',
            },
            ' for webpage traffic and performance statistics, and ',
            {
              text: 'Google Fonts',
              href: 'https://developers.google.com/fonts/faq/privacy',
            },
            '. Opening it sends network requests that include technical information such as your IP address, browser, and requested page. This webpage does not read the food list stored in the Sooner app.',
          ],
        ],
      },
      {
        heading: 'Changes and contact',
        paragraphs: [
          [
            'We will update this page\'s date when the policy changes. For privacy questions or requests to access, correct, or delete information, contact ',
            {
              text: 'i@xingbest.fun',
              href: 'mailto:i@xingbest.fun',
            },
            '. We will verify the request and what information can be located, and explain what we can handle. You control local data, while information already held by providers remains subject to their rules and legal requirements. Don\'t send passwords or other sensitive information.',
          ],
        ],
      },
    ],
  },
]
