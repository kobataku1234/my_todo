# TODOアプリ設計メモ

## 機能要件
- TODOの作成、編集、削除
- TODOのカテゴリ分け
- アニメーションを活用した魅力的なUI
- タスクの優先度設定
- タスクの期限設定
- タスクの進捗状況トラッキング

## 技術スタック
- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion
- Supabase

## データベース設計

### todos テーブル
```sql
create table todos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text,
  priority text check (priority in ('low', 'medium', 'high')),
  due_date timestamp with time zone,
  status text check (status in ('not_started', 'in_progress', 'completed')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### categories テーブル
```sql
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  color text,
  created_at timestamp with time zone default now()
);
```

## コンポーネント構造
- Layout
  - Header
  - Sidebar (カテゴリ一覧)
  - Main Content
    - TodoList
      - TodoCard
      - TodoForm
    - CategoryList
      - CategoryCard
      - CategoryForm

## アニメーション要素
- タスクの完了時のアニメーション
- タスクの追加/削除時のアニメーション
- カテゴリ切り替え時のトランジション
- ドラッグ&ドロップでの優先度変更

## 特徴的な機能
1. モーション重視のUI
2. カテゴリごとの色分け
3. インタラクティブなタスク管理
4. 直感的な操作性
5. レスポンシブデザイン
