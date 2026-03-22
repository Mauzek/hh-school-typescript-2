// ─── Branded types ──────────────────────────────────────────────

declare const __todoIdBrand: unique symbol;
declare const __userIdBrand: unique symbol;

type TodoId = number & { readonly [__todoIdBrand]: typeof __todoIdBrand };
type UserId = number & { readonly [__userIdBrand]: typeof __userIdBrand };

// Функции для создания branded значений
export function todoId(id: number): TodoId {
  return id as TodoId;
}

export function userId(id: number): UserId {
  return id as UserId;
}

// ─── Приоритеты ─────────────────────────

export const PRIORITIES = ["low", "medium", "high", "critical"] as const;
type Priority = (typeof PRIORITIES)[number];

// ─── Модели ─────────────────────────────────────────────────────

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

interface User {
  id: UserId;
  name: string;
  email: string;
}

// ─── API-ответ ─────────────────────

interface ApiSuccess<T> {
  status: "success";
  data: T;
}

interface ApiError {
  status: "error";
  message: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export function handleResult<T>(result: ApiResult<T>): T | null {
  switch (result.status) {
    case "success":
      return result.data;
    case "error":
      console.error(`API Error: ${result.message}`);
      return null;
    default: {
      // При добавлении нового status в union будет ошибка компиляции
      const _exhaustive: never = result;
      return _exhaustive;
    }
  }
}

// ─── Маппинг приоритетов на цвета ─────

export const PRIORITY_COLORS = {
  low: "#8bc34a",
  medium: "#ffeb3b",
  high: "#ff9800",
  critical: "#f44336",
} as const satisfies { [K in Priority]: string };


// ─── Utility types ──────────────────────────────────────────────

export type TodoPreview = Pick<Todo, "id" | "title" | "completed">;
export type TodoCreate = Omit<Todo, "id" | "createdAt">;
export type ReadonlyTodo = Readonly<Todo>;

export function apiRequest<T>(url: string): ApiResult<T> {
  // Эмуляция API-запроса
  try {
    console.log(`Requesting: ${url}`);
    // Возвращаем ошибку как заглушку
    return {
      status: "error",
      message: `Mock: несуществующий HTTP-запрос ${url}`,
    };
  } catch {
    return {
      status: "error",
      message: "Неизвестная ошибка",
    };
  }
}


export function getTodos(): ApiResult<TodoPreview[]>;
export function getTodos(id: TodoId): ApiResult<Todo>;
 export function getTodos(id?: TodoId): ApiResult<TodoPreview[]> | ApiResult<Todo> {
  if (id !== undefined) {
    // Запрос одной задачи по id
    return apiRequest<Todo>(`/api/todos/${id}`);
  }
  // Запрос списка превью
  return apiRequest<TodoPreview[]>("/api/todos");
}

export function findTodo(id: TodoId): void {
  console.log("Найдена задача:", id);
}

export function findUser(id: UserId): void {
  console.log("Найден пользователь:", id);
}