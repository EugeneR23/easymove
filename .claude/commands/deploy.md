# Deploy to Vercel

Deploy the current state of the project to Vercel production.

Run the following steps in order:

1. Check for any TypeScript errors first:
   ```
   cd "d:/Работа/Moving/Автоматизация/easymove-elite" && npx tsc --noEmit 2>&1 | head -30
   ```
   If there are errors, report them and stop — do not deploy broken code.

2. Deploy to Vercel production:
   ```
   cd "d:/Работа/Moving/Автоматизация/easymove-elite" && npx vercel --prod --yes 2>&1
   ```

3. Report the deployment URL from the output.

4. If deploy failed, show the error and suggest the fix.
