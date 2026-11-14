<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hireloop client

Next.js 16 App Router job-board frontend with Better Auth + MongoDB. Use npm (`package-lock.json`); there are no tests, CI workflows, or task runner.

## Verification

- `npm run typecheck` (`tsc --noEmit`) and `npm run lint` (ESLint CLI; Next 16 removed `next lint`). Run both after changes; there is no test suite.
- Baseline lint already fails: `components/ui/carousel.tsx` and `hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`) plus an unescaped apostrophe in `app/(auth)/sign-up/page.tsx`. Don't attribute these to your change.
- `npm run dev` uses Turbopack by default and rewrites the managed Next.js block above.
- `npm run format` runs Prettier on `**/*.{ts,tsx}` only — CSS/JSON/Markdown are not covered. Prefer formatting only touched files; the repo is not fully formatted, so a repo-wide run creates noisy diffs.
- Prettier style: no semicolons, double quotes, LF, 80 columns, Tailwind class sorting (`cn`, `cva`).

## Layout

- `@/*` maps to the repo root: `@/components`, `@/lib`, `@/hooks`, `@/app/...`.
- Auth pages are the `app/(auth)` route group (`/sign-in`, `/sign-up`).
- Dashboards are under `app/dashbord/` — the route is misspelled (`/dashbord`, `/dashbord/admin|recruiter|seeker`). Use that spelling; do not rename it. The pages are placeholders, and `app/dashbord/layout.tsx` owns the sidebar chrome: a black `main` with a sticky top bar (below the global navbar) that holds `SidebarTrigger`. The sidebar starts at `top-20` so it sits under the navbar.
- Role-based sidebar links are defined in `app/components/sidebar-menu-items.ts` (`menuitemsRole`, roles `seeker | recruiter | admin`); nested dashboard links use `/dashbord/<role>/...`. The active menu follows the first URL segment under `/dashbord`, not the session role.
- There is no `proxy.ts`/`middleware.ts` and no route protection: auth state is client-side only (`useSession`). Add guards instead of assuming they exist.
- Shared components live in `components/`; route-specific ones can live in `app/components/`.

## UI conventions

- `components/ui/*` holds the shadcn component library. Add with `npx shadcn@latest add <name>`; `components.json` pins the `base-nova` style (Tailwind v4, `app/globals.css`).
- Primitives come from `@base-ui/react`, not Radix. Compose them with the `render` prop (e.g. `<SheetClose render={<Link href="..." />}>`); there is no `asChild`.
- `cn` is the standalone `cn` npm package (clsx + tailwind-merge replacement). `lib/utils.ts` re-exports it, while generated UI files import `from "cn"` directly — both are expected.
- Tailwind v4 is CSS-first: no `tailwind.config.*`. Theme tokens are defined with `@theme inline`, `:root`, and `.dark` in `app/globals.css`. The site defaults to `.dark` (`components/theme-provider.tsx` `defaultTheme="dark"`), and marketing/auth pages also use hardcoded `#6c5dfc`/`#7d70ff` accent classes.

## Auth and data

- Better Auth handler: `app/api/auth/[...all]/route.ts`. Server config is `lib/auth.ts` (Mongo database `hireloopdb`); browser client is `lib/auth-client.ts` (`signIn`, `signUp`, `signOut`, `useSession`).
- User `role` is an additional field with values `seeker | admin | recruiter`. `auth-client.ts` uses `inferAdditionalFields<typeof auth>()`, so keep the server `auth` type generic in sync when changing fields; never add runtime imports of `lib/auth` to client code.
- Email/password auth requires `MONGODB_URL`, `BETTER_AUTH_SECRET`, and `NEXT_PUBLIC_BETTER_AUTH_URL`; Google OAuth additionally requires `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`. All live in the gitignored `.env`.
- Google sign-in buttons render but are not wired up yet; email/password flows are implemented in the auth pages.

## Next.js 16 notes

- `params`, `searchParams`, `cookies()`, and `headers()` are async.
- `middleware` was renamed to `proxy` (this repo has neither yet).
- Consult `node_modules/next/dist/docs/` rather than assuming older App Router behavior.
