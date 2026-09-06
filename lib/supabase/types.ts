export type LpLog = {
  id: string;
  author: string;
  amount: number;
  reason: string;
  created_at: string;
};

export type Comment = {
  id: string;
  log_id: string;
  author: string;
  body: string;
  created_at: string;
};

export type Member = {
  id: string;
  name: string;
  emoji: string | null;
  created_at: string;
};

export type NewLpLog = Pick<LpLog, "author" | "amount" | "reason">;
export type NewComment = Pick<Comment, "log_id" | "author" | "body">;
