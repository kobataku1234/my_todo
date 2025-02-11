export type Priority = 'low' | 'medium' | 'high'
export type Status = 'not_started' | 'in_progress' | 'completed'

export interface Todo {
  id: string
  title: string
  description?: string
  category?: string
  priority: Priority
  due_date?: string
  status: Status
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  color: string
  created_at: string
}
