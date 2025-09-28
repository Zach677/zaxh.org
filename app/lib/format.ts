const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function formatReadingMinutes(minutes: number) {
  return `${Math.max(1, minutes)} 分钟阅读`;
}
