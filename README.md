# AI Spend Audit

AI Spend Audit is a modern SaaS application that helps teams identify overlapping AI subscriptions, optimize seats, and uncover savings through actionable AI-driven insights.

## Frontend Features
- **Responsive SaaS Dashboard:** A sleek, mobile-ready dashboard built with Tailwind CSS.
- **AI Audit Workflow:** A seamless form flow for teams to declare their AI tools, seats, and current spend.
- **Dynamic Report Pages:** Shareable report URLs detailing actionable cost-saving insights.
- **Charts and Analytics UI:** Visual breakdowns of current vs. optimized spend using modern charting libraries.



## Setup Instructions
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Environment Variables
Create a `.env` file at the root:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## Route Overview
- `/` - Landing page with marketing copy.
- `/audit` - The main audit configuration form.
- `/report/:id` - Read-only shareable report view.
- `/results` - Interactive dashboard and savings breakdown.

## Deployment Steps
1. Push to GitHub.
2. Import project in Vercel.
3. Configure `VITE_API_BASE_URL` in Vercel Environment Variables.
4. Deploy.
