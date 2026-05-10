export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function fetchWithRetry(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) {
      const errorData = await res.json().catch(() => null)
      throw new Error(errorData?.message || `Request failed with status ${res.status}`)
    }
    return res.json()
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Unable to connect to backend server. Please check your connection.')
    }
    throw err
  }
}

export interface ToolPayload {
  toolId: string
  planId: string
  monthlySpendUsd: number
  seats: number
}

export interface AuditRequest {
  teamSize: number
  primaryUseCase: string
  tools: ToolPayload[]
}

export async function generateAuditReport(data: AuditRequest) {
  console.log('Audit payload:', data)
  try {
    return await fetchWithRetry(`${API_BASE_URL}/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch (err: any) {
    if (err.message && err.message.includes('required')) {
      throw new Error('Please complete all required tool fields.')
    }
    throw new Error(err.message === 'Unable to connect to backend server. Please check your connection.' ? err.message : (err.message || 'Audit generation failed. Please try again.'))
  }
}

export async function generateAiSummary(reportId: string) {
  try {
    return await fetchWithRetry(`${API_BASE_URL}/summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reportId }),
    })
  } catch (err: any) {
    throw new Error('Failed to generate AI summary.')
  }
}

export async function captureLead(data: {
  email: string
  company: string
  role: string
  teamSize: number
  reportId: string
}) {
  try {
    return await fetchWithRetry(`${API_BASE_URL}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch (err: any) {
    throw new Error('Failed to capture lead details.')
  }
}

export async function getReport(reportId: string) {
  try {
    return await fetchWithRetry(`${API_BASE_URL}/report/${reportId}`)
  } catch (err: any) {
    throw new Error('Failed to retrieve the requested report.')
  }
}
