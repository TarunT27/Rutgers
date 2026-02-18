# Rutgers Portal (Next.js)

Fully wired Rutgers-style portal prototype with no dead UI clicks.

## Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Zustand
- Mock APIs in `/app/api/*`

## Run
```bash
npm install
npm run dev
```

Open:
- `http://localhost:3000/login`
- `http://localhost:3000/dashboard`

## Routes
- `/login`
- `/dashboard`
- `/notifications`
- `/courses`
- `/money`
- `/degree`
- `/financial-aid`
- `/settings`
- `/help`
- `/search`
- `/print/transcript`
- `/logout`

## Notes
- Toggle **Demo Data** in the header to switch between empty/data states.
- All click targets are mapped in `CLICK_MAP.md`.
