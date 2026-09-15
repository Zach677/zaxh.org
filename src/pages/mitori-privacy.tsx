import * as stylex from '@stylexjs/stylex'

import { colors } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'

const styles = stylex.create({
  main: {
    maxWidth: '42rem',
  },
  hello: {
    margin: '2rem 0 1rem',
  },
  accent: {
    color: colors.accent,
  },
  updated: {
    marginBottom: '2.5rem',
  },
})

export default function MitoriPrivacyPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(shared.pageTitle, styles.hello)}>
        <span {...stylex.props(styles.accent)}>Mitori</span> Privacy Policy
      </h1>
      <p {...stylex.props(shared.regLabel, styles.updated)}>
        Last updated: July 29, 2026
      </p>

      <article className="md-reader">
        <h2>Scope</h2>
        <p>
          This policy describes how the Mitori macOS app handles information. It
          also explains the limited analytics used by the website that hosts
          this policy.
        </p>

        <h2>Information handled by Mitori</h2>
        <p>
          Mitori processes the Apple ID email address, password, and two-factor
          authentication code you provide. It also handles cookies and session
          tokens returned by Apple, along with the device identifier and probe
          app bundle identifier used for balance requests.
        </p>
        <p>
          The two-factor authentication code is used for sign-in and is not
          stored. Account metadata stored on your Mac may include your name,
          email address, storefront, balance snapshot, refresh history, and
          error state.
        </p>

        <h2>Local storage</h2>
        <p>
          Passwords, cookies, and session tokens are stored in the macOS
          Keychain and are not synchronized to iCloud. Development-signed builds
          use the Data Protection Keychain. Ad hoc community builds use the
          local file-based macOS Keychain because Data Protection Keychain
          access requires Apple provisioning.
        </p>
        <p>
          Account metadata is stored locally in{' '}
          <code>~/Library/Application Support/Mitori/accounts.json</code>.
        </p>

        <h2>Network requests</h2>
        <p>
          Mitori connects to Apple services to authenticate your account,
          refresh its session, look up the probe app, and retrieve the account
          balance. Account information is not sent to a server operated by the
          Mitori developer.
        </p>
        <p>
          The app contains no advertising or analytics SDK and does not sell or
          rent personal information.
        </p>

        <h2>Removing data</h2>
        <p>
          Removing an account from Mitori deletes its stored credentials and
          account metadata. Uninstalling the app by itself does not remove
          Keychain items or the local account data file. Remove accounts in
          Mitori before uninstalling if you want the app to delete this data.
        </p>

        <h2>This policy website</h2>
        <p>
          This website uses Vercel Web Analytics for anonymous, cookie-free
          page-view statistics and Vercel Speed Insights for website performance
          measurements. These services receive website usage and performance
          data when you visit this page. They do not receive the Apple ID
          credentials or account data stored by Mitori. See{' '}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Web Analytics privacy and compliance
          </a>{' '}
          for details.
        </p>

        <h2>Changes and contact</h2>
        <p>
          This page will show a new date when the policy changes. Questions can
          be opened in the{' '}
          <a
            href="https://github.com/Zach677/mitori/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mitori GitHub repository
          </a>
          . Do not include passwords, two-factor authentication codes, cookies,
          or tokens in a public issue.
        </p>
      </article>
    </main>
  )
}
