'use client'

import { AnimatePresence } from "framer-motion"
import { Todo, Status } from "@/types/todo"
import { TodoCard } from "./todo-card"

interface TodoListProps {
  todos: Todo[]
  onStatusChange: (id: string, status: Status) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

export function TodoList({ todos, onStatusChange, onDelete, onEdit }: TodoListProps) {
  const sortedTodos = [...todos].sort((a, b) => {
    // 完了したタスクを後ろに
    if (a.status === "completed" && b.status !== "completed") return 1
    if (a.status !== "completed" && b.status === "completed") return -1

    // 優先度でソート
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }

    // 期限日でソート
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    }
    if (a.due_date) return -1
    if (b.due_date) return 1

    // 作成日でソート
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sortedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
