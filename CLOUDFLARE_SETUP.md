# Cloudflare Pages Setup Guide

This project is configured for Cloudflare Pages using the `@cloudflare/next-on-pages` adapter.

## 1. Build Configuration
When setting up the project in Cloudflare Dashboard:

- **Build Command:** `npx @cloudflare/next-on-pages@1`
- **Output Directory:** `.vercel/output/static`
- **Node.js Version:** 20+ (Recommended)

## 2. Environment Variables
You MUST verify you have added the following variable in **Settings > Environment Variables**:

- `RESEND_API_KEY`: `re_...` (Your secure API key)

## 3. Deployment Steps
1. Push code to GitHub/GitLab.
2. Connect repository to Cloudflare Pages.
3. Enter the Build Command and Output Directory above.
4. Add the Environment Variable.
5. Deploy.

## 4. Troubleshooting
- If the build fails on `npm install`, ensure you are not committing `package-lock.json` if using `yarn` or vice-versa.
- If email fails, check the `RESEND_API_KEY` and ensure DNS records for `ramosdigital.pt` are verified in Resend.
