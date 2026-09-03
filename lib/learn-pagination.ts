export function paginateItems<T>(items: T[], currentPage: number, pageSize: number) {
  const safePage = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const boundedPage = Math.min(safePage, pageCount);
  const start = (boundedPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    currentPage: boundedPage,
    pageCount,
    items: items.slice(start, end),
  };
}
