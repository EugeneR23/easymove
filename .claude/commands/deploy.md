# Deploy to Vercel

Deploy the current state of the project to Vercel production.

This project deploys through the Vercel **GitHub integration**: pushing `main` to
`origin` (github.com/EugeneR23/easymove) is what triggers a production build.
There is no `.vercel` link in the repo, so `npx vercel --prod` would ask to link
a project first — do not reach for it unless the git path is unavailable.

Run these steps in order, from the repository root (do not hardcode a path — the
working directory is already correct):

1. Typecheck. Do not deploy broken code:
   ```
   npx tsc --noEmit 2>&1 | head -30
   ```

2. Run the pricing regression suite. It guards live quote arithmetic:
   ```
   npx tsx scripts/pricing.test.ts
   ```
   Anything other than `ALL PASS` stops the deploy.

3. `npx next build` is worth running, but on a Windows checkout under a path
   containing a space (`E:/AI Projects/…`) it fails to prerender `/icon` and
   `/twitter-image`: `@vercel/og` cannot parse `file:///E:/AI%20Projects/...`.
   That failure is local-only — Vercel builds on a path without spaces. Confirm
   it reproduces on an unmodified checkout before treating it as a regression.

4. Push:
   ```
   git push origin main
   ```

5. **Verify the new code is actually being served** before reporting success.
   Deploy latency has been mistaken for a failed fix before. Poll production for
   something only the new build contains, and distinguish "old build still up"
   from "page is broken":
   ```
   curl -s https://www.easy-move-florida.com/pricing | grep -c "<a string only the new build has>"
   ```

6. Report the result plainly. If the deploy failed, show the error.
