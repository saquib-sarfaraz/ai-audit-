# SaaS Economics & Infra Costs

## Estimated Infrastructure Costs
- **Frontend Hosting (Vercel):** $0 (Free Tier) initially. Scales to $20/mo (Pro) when traffic increases.
- **Backend API:** $5-$10/mo on minimal VPS or Render.
- **Database (MongoDB Atlas):** $0 (Free Tier) up to 500MB.
- **AI Summary Generation (Groq):** Fractions of a cent per request. Highly economical compared to GPT-4.

## Frontend Hosting Assumptions
Vite builds a highly optimized static bundle. We rely heavily on client-side fetching to keep backend architecture stateless and cheap.

## Projected SaaS Value Proposition
If we can save a 50-person startup $5,000/year in unused Copilot/ChatGPT seats, charging a flat $299 audit fee is a no-brainer.
