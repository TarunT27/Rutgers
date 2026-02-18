# CLICK MAP

## Global Header
- **Demo Data toggle**: toggles populated vs empty state data globally (persisted in Zustand localStorage).
- **Plus icon**: opens Quick Add dialog with Add Reminder/Add Note/Add Bookmark actions.
- **Bell icon**: navigates to `/notifications`.
- **Search icon**: navigates to `/search`.
- **Logout icon**: navigates to `/logout` and clears session.

## Sidebar
- Dashboard → `/dashboard`
- Courses → `/courses`
- Notifications → `/notifications`
- Money → `/money`
- Degree → `/degree`
- Financial Aid → `/financial-aid`
- Settings → `/settings`
- Help → `/help`

## Dashboard Card Interactions
- **User Profile Avatar**: opens Profile Summary dialog.
- **Password/Privacy/Phone**: open edit dialogs and save with toast.
- **ID Card**: navigates to `/profile/id-card` with download action.
- **Health/Wellness**: navigates to `/help#health` and `/help#wellness`.
- **Notifications rows**: open notification detail dialog.
- **Mark as read**: updates notification state to History.
- **Course Activity row**: opens activity detail dialog.
- **Go to course**: routes to `/courses?course=...`.
- **Self Reporting Absence**: opens absence submission dialog and stores record.
- **Export Course Schedule**: downloads schedule CSV for selected term.
- **Expand Course Schedule**: routes to `/courses?tab=schedule&term=...`.
- **Grade row click**: opens Grade Detail dialog.
- **Unofficial Transcript**: opens transcript dialog.
- **Transcript: Open Printable View**: opens `/print/transcript` in new tab.
- **Transcript: Download PDF (placeholder)**: downloads transcript text file (real file action).
- **My Money eye**: toggles hidden/shown values globally.
- **View Billing**: routes to `/money`.
- **Make Payment**: opens payment dialog and submits with toast.
- **Degree KPI circles**: opens GPA breakdown dialog.
- **Financial Aid tabs**: switch view between Apply/Docs/Notifs/Award.
- **Award Detail and Information**: opens award modal.
- **Award modal Download Award Summary CSV**: downloads CSV.
- **Award modal View docs needed**: routes to `/financial-aid?tab=docs`.

## Module Pages
- `/notifications`: Active/History tabs, category filter, detail dialog.
- `/courses`: tabs for Schedule/Activity/Grades/Absence and Schedule CSV export.
- `/money`: Make Payment dialog and statement CSV export.
- `/degree`: GPA visibility toggle and GPA breakdown dialog.
- `/financial-aid`: tabs, award modal, docs list.
- `/settings`: Demo Data, sidebar collapse, hide money toggles, bookmark list.
- `/help`: FAQ accordion + section anchors.
- `/search`: grouped search results and click-through route actions.
- `/print/transcript`: print-friendly transcript and print button.
