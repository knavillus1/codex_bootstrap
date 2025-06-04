export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString();
}
