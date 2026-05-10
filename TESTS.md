# Frontend Testing Plan

## Form Validation
- Validate that all required fields (Team Size, Primary Use Case) trigger Zod errors if left empty.
- Test that adding/removing tools correctly updates the `react-hook-form` field arrays.

## Dashboard Rendering
- Mock the API response and ensure `ToolBreakdown` and `RecommendationsSection` render the correct data points.
- Ensure the total savings logic calculates correctly on the frontend if needed.

## API Integration & Error States
- Test network failures (`fetchWithRetry`). Verify that generic "Failed to fetch" errors are caught and replaced with human-readable "Unable to connect to backend server" messages.
- Test that missing reports correctly render the fallback UI instead of crashing the React tree.

## Loading States
- Verify that `<DashboardSkeleton />` displays properly while fetching the report via ID.
