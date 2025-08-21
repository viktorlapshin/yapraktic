export function formatOrderDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays =
    (startOfDay(now).getTime() - startOfDay(d).getTime()) /
    (1000 * 60 * 60 * 24);

  const timeStr = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

  if (diffDays === 0) return `Сегодня, ${timeStr}`;
  if (diffDays === 1) return `Вчера, ${timeStr}`;

  const dateStr = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
  return `${dateStr}, ${timeStr}`;
}
