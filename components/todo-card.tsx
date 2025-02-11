'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Todo, Priority, Status } from "@/types/todo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Calendar, Clock, AlertCircle } from "lucide-react"

interface TodoCardProps {
  todo: Todo
  onStatusChange: (id: string, status: Status) => void
  onDelete: (id: string) => void
  onEdit: (todo: Todo) => void
}

const priorityColors: Record<Priority, string> = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
}

const statusLabels: Record<Status, string> = {
  not_started: "未着手",
  in_progress: "進行中",
  completed: "完了",
}

export function TodoCard({ todo, onStatusChange, onDelete, onEdit }: TodoCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      whileHover={{ scale: 1.02 }}
      className="will-change-transform"
    >
      <Card className={cn(
        "border-l-4",
        todo.status === "completed" ? "border-l-green-500 opacity-75" : `border-l-${priorityColors[todo.priority]}`
      )}>
        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
          <Checkbox
            checked={todo.status === "completed"}
            onCheckedChange={() => {
              onStatusChange(
                todo.id,
                todo.status === "completed" ? "not_started" : "completed"
              )
            }}
          />
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold leading-none tracking-tight",
              todo.status === "completed" && "line-through"
            )}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {todo.description}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 text-sm text-muted-foreground">
            {todo.due_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(todo.due_date).toLocaleDateString()}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {statusLabels[todo.status]}
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {todo.priority}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(todo)}
          >
            編集
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(todo.id)}
          >
            削除
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
