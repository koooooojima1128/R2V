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

export type Report = {
  id: string;
  target_type: "log" | "comment";
  target_id: string;
  reporter: string | null;
  note: string | null;
  created_at: string;
};

export type NewLpLog = Pick<LpLog, "author" | "amount" | "reason">;
export type NewComment = Pick<Comment, "log_id" | "author" | "body">;
export type NewReport = Pick<Report, "target_type" | "target_id" | "reporter" | "note">;
