// Support copy, rendered in both languages without client-side selection.
// Every answer reflects the app as shipped; check the app before changing a fact.
import type { PrivacySegment } from './sooner-privacy-content'

export type SupportSegment = PrivacySegment

interface SupportLocale {
  id: 'zh' | 'en'
  lang: 'zh-CN' | 'en'
  title: string
  intro: SupportSegment[]
  questions: { heading: string; paragraphs: SupportSegment[][] }[]
}

export const SOONER_SUPPORT_EMAIL = 'i@xingbest.fun'
const email = { text: SOONER_SUPPORT_EMAIL, href: `mailto:${SOONER_SUPPORT_EMAIL}` }

export const soonerSupportMetadata = {
  title: '趁鲜支持 / Sooner Support',
  description:
    '趁鲜支持：联系邮箱，以及 AI 次数、到期提醒、数据存放与删除的常见问题。Sooner support: contact email and answers about AI limits, reminders, and your data.',
  url: 'https://zaxh.org/sooner/support',
}

export const soonerSupportContent: SupportLocale[] = [
  {
    id: 'zh',
    lang: 'zh-CN',
    title: '趁鲜支持',
    intro: [
      '遇到问题或有建议，请发邮件到 ',
      email,
      '。写上 iPhone 型号、iOS 版本、趁鲜版本（在 App「设置」最下面），以及你做了什么、看到了什么，附截图更好。不要发来密码或验证码。也可以在 App 的「设置」里点「反馈问题」直接发给我们。',
    ],
    questions: [
      {
        heading: 'AI 每天能用几次？',
        paragraphs: [
          [
            '照片识别和「问趁鲜」每天各有次数，分开计算，一样用完不影响另一样；「每天」按北京时间算，北京时间 24 点后恢复。照片识别用完后，App 改在手机上识别；「问趁鲜」用完后，要过了北京时间 24 点才能再问。',
          ],
          [
            '「用 AI」默认关闭，在「设置」里打开或关闭。不用 AI，手动添加和手机上的识别照常可用。',
          ],
        ],
      },
      {
        heading: '到期提醒什么时候来？',
        paragraphs: [
          [
            '填了到期日的食物，到期前一天早上 9 点、到期当天下午 6 点各提醒一次，按手机的时区；同一天到期的合在一条里。没填到期日的，加入 3 天后早上 9 点问你还在不在。在通知上可以直接标记吃完、扔掉，或明天再提醒。',
          ],
        ],
      },
      {
        heading: '收不到提醒怎么办？',
        paragraphs: [
          [
            '提醒在手机上生成，需要允许通知。在 App「设置」里点「通知」，按提示打开；或到 iOS「设置」里为趁鲜打开通知。想关掉提醒，也在 iOS「设置」里关。',
          ],
        ],
      },
      {
        heading: '我的数据存在哪？',
        paragraphs: [
          [
            '食物清单和历史只存在这台手机上。趁鲜没有账号，也不做云同步。查商品名、使用 AI 和发送反馈时会联网；发出什么、保存多久，见',
            { text: '隐私政策', href: '/sooner/privacy' },
            '。',
          ],
        ],
      },
      {
        heading: '怎么删除数据？',
        paragraphs: [
          [
            '删除单个食物：打开它，在「•••」菜单里点「删除」。删除不算吃完，也不算扔掉。App 里没有一键清空；卸载 App 会移除手机上的数据，系统备份由你的备份设置决定。',
          ],
          [
            '想删除发过的反馈，或服务器上的设备验证记录，请发邮件到 ',
            email,
            '，我们会说明能处理的范围。',
          ],
        ],
      },
      {
        heading: '扫了条码没出名字？',
        paragraphs: [
          [
            '查商品名需要联网，查不到时 App 不会提示。拍照识别和手动输入照样能用。查到过的名字会记在手机上，下次扫同一个条码不用联网。',
          ],
        ],
      },
      {
        heading: '支持哪些设备？',
        paragraphs: [['iPhone，iOS 26 及以上。App 有中文和英文两种语言。']],
      },
    ],
  },
  {
    id: 'en',
    lang: 'en',
    title: 'Sooner Support',
    intro: [
      'If something isn\'t working or you have a suggestion, email ',
      email,
      '. Include your iPhone model, iOS version, Sooner version (at the bottom of Settings in the app), and what you did and saw. A screenshot helps. Don\'t send passwords or verification codes. You can also tap Send Feedback in the app\'s Settings.',
    ],
    questions: [
      {
        heading: 'How often can I use AI?',
        paragraphs: [
          [
            'Photos and Ask Sooner each have their own daily limit, counted separately, so running out of one doesn\'t affect the other. Days are counted in Beijing time, and limits reset at midnight Beijing time. When photo reads run out, the app reads photos on your phone instead. When questions run out, Ask Sooner can be used again after midnight Beijing time.',
          ],
          [
            'Use AI is off by default. Turn it on or off in Settings. Without AI, adding food by hand and on-phone reading still work.',
          ],
        ],
      },
      {
        heading: 'When do expiry reminders arrive?',
        paragraphs: [
          [
            'For food with an expiry date, you get one reminder at 9 AM the day before and one at 6 PM on the day, in your phone\'s time zone. Food expiring on the same day shares one reminder. For food without a date, the app asks whether you still have it at 9 AM, three days after you add it. From the notification you can mark food as eaten or tossed, or be reminded tomorrow.',
          ],
        ],
      },
      {
        heading: 'Why am I not getting reminders?',
        paragraphs: [
          [
            'Reminders are made on your phone and need notification access. In the app\'s Settings, tap Notifications and follow the prompt, or turn on notifications for Sooner in iOS Settings. To stop reminders, turn them off in iOS Settings.',
          ],
        ],
      },
      {
        heading: 'Where is my data?',
        paragraphs: [
          [
            'Your food list and history stay on this iPhone. Sooner has no account and no cloud sync. Looking up product names, using AI, and sending feedback go online. For what is sent and how long it is kept, see the ',
            { text: 'privacy policy', href: '/sooner/privacy' },
            '.',
          ],
        ],
      },
      {
        heading: 'How do I delete data?',
        paragraphs: [
          [
            'To delete one item, open it and tap Delete in the ••• menu. Deleting doesn\'t count as eaten or tossed. There is no clear-all control in the app. Uninstalling removes the data on your phone; system backups follow your backup settings.',
          ],
          [
            'To delete feedback you sent, or device verification records on our server, email ',
            email,
            ' and we\'ll explain what we can handle.',
          ],
        ],
      },
      {
        heading: 'I scanned a barcode and no name appeared',
        paragraphs: [
          [
            'Looking up a product name needs the internet, and the app stays quiet when no name is found. Photo reading and typing still work. Names found before are remembered on your phone, so scanning the same barcode again works offline.',
          ],
        ],
      },
      {
        heading: 'Which devices are supported?',
        paragraphs: [['iPhone with iOS 26 or later. The app is available in English and Chinese.']],
      },
    ],
  },
]
