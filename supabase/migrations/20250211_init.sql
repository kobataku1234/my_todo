-- Create todos table
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

-- Create categories table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  color text,
  created_at timestamp with time zone default now()
);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for todos table
create trigger update_todos_updated_at
  before update on todos
  for each row
  execute function update_updated_at_column();
