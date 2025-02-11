import { useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Todo } from "@/types/todo"
import { TodoFormValues, todoFormSchema } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect } from "react"

interface TodoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TodoFormValues) => void
  defaultValues?: Partial<Todo>
}

export function TodoForm({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
}: TodoFormProps) {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      priority: defaultValues?.priority || "medium",
      due_date: defaultValues?.due_date || "",
      status: defaultValues?.status || "not_started",
    },
  })

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title,
        description: defaultValues.description,
        priority: defaultValues.priority,
        due_date: defaultValues.due_date,
        status: defaultValues.status,
      })
    }
  }, [form, defaultValues])

  // Reset form when sheet is closed
  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [form, open])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>{defaultValues ? "タスクを編集" : "新しいタスク"}</SheetTitle>
          <SheetDescription>
            タスクの詳細を入力してください。*は必須項目です。
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル *</FormLabel>
                  <FormControl>
                    <Input placeholder="タスクのタイトル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明</FormLabel>
                  <FormControl>
                    <Input placeholder="タスクの説明" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>優先度 *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="優先度を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">低</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="high">高</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>期限日</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                キャンセル
              </Button>
              <Button type="submit">
                {defaultValues ? "更新" : "作成"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
