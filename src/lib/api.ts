export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function generateAuditReport(data: any) {
  const res = await fetch(`${API_BASE_URL}/audit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to generate audit report')
  }
  return res.json()
}

export async function generateAiSummary(reportId: string) {
  const res = await fetch(`${API_BASE_URL}/summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reportId }),
  })
  if (!res.ok) {
    throw new Error('Failed to generate summary')
  }
  return res.json()
}

export async function captureLead(data: {
  email: string
  company: string
  role: string
  teamSize: number
  reportId: string
}) {
  const res = await fetch(`${API_BASE_URL}/lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('Failed to capture lead')
  }
  return res.json()
}

export async function getReport(reportId: string) {
  const res = await fetch(`${API_BASE_URL}/report/${reportId}`)
  if (!res.ok) {
    throw new Error('Failed to get report')
  }
  return res.json()
}
