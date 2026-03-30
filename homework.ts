// ─── Проверки TASK 1─────────────────────────────────────────────────

import {
  GENRES,
  Movie,
  MovieFull,
  filterByGenre,
  sortMovies,
  toCard,
  GENRE_EMOJI,
} from "./task1_movies";

console.log("────── Проверки TASK 1 ──────\n");

const genreCheck: readonly ["comedy", "drama", "action", "horror", "sci-fi"] =
  GENRES;

const fullMovie: MovieFull = {
  id: 1,
  title: "Test",
  year: 2024,
  rating: 9,
  genre: "drama",
};
// fullMovie.title = "x";  Ошибка: нельзя изменять readonly свойства

const movies: Movie[] = [
  {
    id: 1,
    title: "Матрица",
    year: 1999,
    rating: 8.7,
    genre: "sci-fi",
    director: "Вачовски",
  },
  { id: 2, title: "Начало", year: 2010, rating: 8.8, genre: "action" },
  { id: 3, title: "SuperПерцы", year: 2007, rating: 7.6, genre: "comedy" },
  {
    id: 4,
    title: "Паразиты",
    year: 2019,
    rating: 8.5,
    genre: "drama",
    description: "Переоценённый фильм",
  },
];

const sciFi = filterByGenre(movies, "sci-fi");
const sorted = sortMovies(movies, "rating");
const card = toCard(movies[0]);

console.log(
  "Sci-Fi:",
  sciFi.map((m) => m.title),
);
console.log(
  "По рейтингу:",
  sorted.map((m) => `${m.title} (${m.rating})`),
);
console.log("Карточка:", card);
console.log("Emoji:", GENRE_EMOJI["horror"]);



// ─── Проверки TASK 2 ─────────────────────────────────────────────────

import {
  AppNotification,
  TrackedNotification,
  renderNotification,
  isErrorNotification,
  getUnread,
  NOTIFICATION_CONFIG,
  NotificationPreview,
  NotificationWithoutMeta,
} from "./task2_notifications";

console.log("\n────── Проверки TASK 2 ──────\n");

const notifications: TrackedNotification[] = [
  {
    type: "success",
    message: "Успех",
    duration: 3000,
    id: "1",
    createdAt: new Date("2026-03-21"),
    readAt: new Date("2026-03-21"),
  },
  {
    type: "error",
    message: "Ошибка",
    retry: true,
    errorCode: 503,
    id: "2",
    createdAt: new Date("2026-03-21"),
  },
  {
    type: "warning",
    message: "Предупреждение",
    id: "3",
    createdAt: new Date("2026-03-21"),
  },
];

for (const n of notifications) {
  console.log(renderNotification(n));
}

const someNotification: AppNotification = {
  type: "error",
  message: "Упс",
  retry: false,
  errorCode: 404,
};

if (isErrorNotification(someNotification)) {
  console.log(
    `Код ошибки: ${someNotification.errorCode}, повтор: ${someNotification.retry}`,
  );
}

const unread = getUnread(notifications);
console.log(
  "Непрочитанные:",
  unread.map((n) => n.message),
);

const color: "#4caf50" = NOTIFICATION_CONFIG.success.color;

const preview: NotificationPreview = { type: "warning", message: "test" };

const stripped: NotificationWithoutMeta = {
  type: "error",
  message: "Ошибка",
  retry: true,
};



// ─── Проверки TASK 3 ──────────────────────────────────────────────────

import {
  PRIORITIES,
  Todo,
  ApiResult,
  todoId,
  userId,
  findTodo,
  findUser,
  getTodos,
  PRIORITY_COLORS,
  TodoCreate,
  TodoPreview,
  ReadonlyTodo,
  handleResult,
} from "./task3_api_client";

console.log("\n────── Проверки TASK 3 ──────\n");

const myTodoId = todoId(1);
const myUserId = userId(1);

findTodo(myTodoId); 
findUser(myUserId); 
// findTodo(myUserId);  // Ошибка, потому что userId не совместим с todoId
// findUser(myTodoId);  // Ошибка, потому что todoId не совместим с userId

const firstPriority: "low" = PRIORITIES[0];

// getTodos() и getTodos(todoId) возвращают разные типы
const allTodos: ApiResult<TodoPreview[]> = getTodos();
const singleTodo: ApiResult<Todo> = getTodos(myTodoId);

const result: ApiResult<Todo[]> = {
  status: "success",
  data: [
    {
      id: todoId(1),
      title: "Выучить TypeScript",
      completed: false,
      priority: "high",
      createdAt: new Date(),
    },
  ],
};

const data = handleResult(result);
if (data) {
  console.log(
    "Todos:",
    data.map((t) => t.title),
  );
}

const criticalColor: "#f44336" = PRIORITY_COLORS.critical;

const newTodo: TodoCreate = {
  title: "Новая задача",
  completed: false,
  priority: "medium",
};

const readonlyTodo: ReadonlyTodo = {
  id: todoId(1),
  title: "Бубу бебе",
  completed: true,
  priority: "low",
  createdAt: new Date(),
};
// readonlyTodo.title = "x"; // Ошибка из-за readonly 

console.log("Приоритетный цвет:", PRIORITY_COLORS[newTodo.priority]);
console.log("Все задачи:", allTodos);
console.log("Одна задача:", singleTodo);
console.log("Только для чтения:", readonlyTodo);
console.log("Первый приоритет:", firstPriority);
console.log("Критический цвет:", criticalColor);