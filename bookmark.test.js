import assert from "node:assert";
import test from "node:test";
import { getUserIds } from "./storage.js";
import { sortBookmarks } from "./bookmark.js";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});

test("Bookmark sorting is correct", () => {
  const bookmarks = [
    { id: 1, title: "A", createdAt: "2023-01-01" },
    { id: 2, title: "B", createdAt: "2023-02-01" },
    { id: 3, title: "C", createdAt: "2023-03-01" },
  ];
  const sorted = sortBookmarks(bookmarks);
  assert.equal(sorted[0].title, "C");
  assert.equal(sorted[1].title, "B");
  assert.equal(sorted[2].title, "A");
});