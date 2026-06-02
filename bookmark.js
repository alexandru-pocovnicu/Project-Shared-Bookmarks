export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}