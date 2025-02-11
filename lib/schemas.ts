import { z } from "zod"

export const todoFormSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "優先度を選択してください",
  }),
  category: z.string().optional(),
  due_date: z.string().optional(),
  status: z.enum(["not_started", "in_progress", "completed"]).default("not_started"),
})

export type TodoFormValues = z.infer<typeof todoFormSchema>
