---
title: Mitori Privacy Policy
description: How Mitori handles Apple ID credentials, account data, network requests, and website analytics.
lang: en
---

# *Mitori* Privacy Policy

Last updated: October 13, 2026

## Scope

This policy describes how the Mitori macOS app handles information. It also explains the limited analytics used by the website that hosts this policy.

## Information handled by Mitori

Mitori processes the Apple ID email address, password, and two-factor authentication code you provide. It also handles cookies and session tokens returned by Apple, along with the device identifier and probe app bundle identifier used for balance requests.

The two-factor authentication code is used for sign-in and is not stored. Account metadata stored on your Mac may include your name, email address, storefront, balance snapshot, refresh history, and error state.

## Local storage

Passwords, cookies, and session tokens are stored in the macOS Keychain and are not synchronized to iCloud. Development-signed builds use the Data Protection Keychain. Ad hoc community builds use the local file-based macOS Keychain because Data Protection Keychain access requires Apple provisioning.

Account metadata is stored locally in `~/Library/Application Support/Mitori/accounts.json`.

## Network requests

Mitori connects to Apple services to authenticate your account, refresh its session, look up the probe app, and retrieve the account balance. Account information is not sent to a server operated by the Mitori developer.

The app contains no advertising or analytics SDK and does not sell or rent personal information.

## Removing data

Removing an account from Mitori deletes its stored credentials and account metadata. Uninstalling the app by itself does not remove Keychain items or the local account data file. Remove accounts in Mitori before uninstalling if you want the app to delete this data.

## This policy website

This website is hosted on Cloudflare. It uses Cloudflare Web Analytics for anonymous, cookie-free page-view statistics and website performance measurements. Cloudflare receives website usage and performance data when you visit this page. It does not receive the Apple ID credentials or account data stored by Mitori. See [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) for details.

## Changes and contact

This page will show a new date when the policy changes. Questions can be opened in the [Mitori GitHub repository](https://github.com/Zach677/mitori/issues). Do not include passwords, two-factor authentication codes, cookies, or tokens in a public issue.
