import { useState, useEffect } from "react"
import { Todo, Status } from "@/types/todo"
import { TodoFormValues } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      console.error("Error fetching todos:", error)
      toast({
        title: "エラー",
        description: "TODOの取得に失敗しました",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (values: TodoFormValues) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([values])
        .select()
        .single()

      if (error) throw error
      setTodos((prev) => [data, ...prev])
      toast({
        title: "成功",
        description: "TODOを作成しました",
      })
      return true
    } catch (error) {
      console.error("Error creating todo:", error)
      toast({
        title: "エラー",
        description: "TODOの作成に失敗しました",
        variant: "destructive",
      })
      return false
    }
  }

  const updateTodo = async (id: string, values: Partial<TodoFormValues>) => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update(values)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...data } : todo))
      )
      toast({
        title: "成功",
        description: "TODOを更新しました",
      })
      return true
    } catch (error) {
      console.error("Error updating todo:", error)
      toast({
        title: "エラー",
        description: "TODOの更新に失敗しました",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id)

      if (error) throw error
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      toast({
        title: "成功",
        description: "TODOを削除しました",
      })
    } catch (error) {
      console.error("Error deleting todo:", error)
      toast({
        title: "エラー",
        description: "TODOの削除に失敗しました",
        variant: "destructive",
      })
    }
  }

  const updateStatus = async (id: string, status: Status) => {
    return updateTodo(id, { status })
  }

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    updateStatus,
  }
}
