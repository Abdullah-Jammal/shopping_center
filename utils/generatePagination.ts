export function generatePagination(current: number, total: number) {
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  const lastPages = [total - 1, total];

  const firstPages = [1, 2];

  if (current <= 4) {
    return [...firstPages, 3, 4, 5, "...", ...lastPages];
  }

  if (current >= total - 3) {
    return [...firstPages, "...", total - 4, total - 3, ...lastPages];
  }

  return [
    ...firstPages,
    "...",
    current - 1,
    current,
    current + 1,
    "...",
    ...lastPages,
  ];
}
