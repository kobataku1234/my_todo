'use client'

import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TodoList } from "@/components/todo-list"
import { TodoForm } from "@/components/todo-form"
import { Button } from "@/components/ui/button"
import { useTodos } from "@/hooks/use-todos"
import { Todo } from "@/types/todo"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  const { todos, loading, createTodo, updateTodo, deleteTodo, updateStatus } = useTodos()
  const [formOpen, setFormOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>()

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setFormOpen(true)
  }

  const handleFormSubmit = async (data: any) => {
    const success = editingTodo
      ? await updateTodo(editingTodo.id, data)
      : await createTodo(data)

    if (success) {
      setFormOpen(false)
      setEditingTodo(undefined)
    }
  }

  const handleFormClose = () => {
    setFormOpen(false)
    setEditingTodo(undefined)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
                    モーションTODO
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    タスクを楽しく管理しましょう
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={() => setFormOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  新しいタスク
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    読み込み中...
                  </motion.div>
                ) : todos.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 text-muted-foreground"
                  >
                    タスクがありません。新しいタスクを作成してみましょう！
                  </motion.div>
                ) : (
                  <TodoList
                    todos={todos}
                    onStatusChange={updateStatus}
                    onDelete={deleteTodo}
                    onEdit={handleEdit}
                  />
                )}
              </AnimatePresence>

              <TodoForm
                open={formOpen}
                onOpenChange={handleFormClose}
                onSubmit={handleFormSubmit}
                defaultValues={editingTodo}
              />
            </motion.div>
            <Toaster />
          </div>
        </motion.div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
