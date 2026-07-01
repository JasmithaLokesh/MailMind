import api from "./api";

export interface DashboardStats {
  total_emails: number;
  unread_emails: number;
  high_priority: number;
  recruiter_emails: number;
  upcoming_deadlines: number;
  spam_emails: number;
  pending_action_items: number;
  average_priority: number;
  emails_today: number;
  emails_this_week: number;
}

export interface Email {
  id: number;
  user_id: number;
  gmail_id: string;
  thread_id: string;
  sender: string;
  subject: string;
  body: string;
  received_at: string;
  category: string;
  is_read: boolean;
  is_starred: boolean;
  priority_score: number | null;
  summary: string | null;
  action_items: string | null;
  classification: string | null;
  deadline: string | null;
  suggested_reply: string | null;
  importance_reason: string | null;
  ai_processed: boolean;
  confidence: string | null;
  sentiment: string | null;
  created_at: string;
}

export const getDashboardStats = async (sessionId: string): Promise<DashboardStats> => {
  const response = await api.get("/api/emails/stats", {
    params: { session_id: sessionId },
  });
  return response.data;
};

export interface EmailResponse {
  total: number;
  emails: Email[];
}

export const getPriorityInbox = async (
  sessionId: string,
  limit: number = 50,
  offset: number = 0,
  options: {
    search?: string;
    category?: string;
    classification?: string;
    is_read?: boolean;
    has_deadline?: boolean;
    priority?: string;
    sort_by?: string;
  } = {}
): Promise<EmailResponse> => {
  const response = await api.get("/api/emails", {
    params: { session_id: sessionId, limit, offset, ...options },
  });
  return response.data;
};

export const getEmailDetails = async (emailId: number, sessionId: string): Promise<Email> => {
  const response = await api.get(`/api/emails/${emailId}`, {
    params: { session_id: sessionId },
  });
  return response.data;
};
