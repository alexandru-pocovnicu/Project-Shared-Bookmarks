

import { sortBookmarks } from "./bookmark.js";
import { getUserIds, getData, setData } from "./storage.js";
const users = getUserIds(); //get the users IDs from storage.js
const selectUser = document.querySelector("#user-dropdown-list");
const userBookmarks = document.getElementById("user-bookmarks");
const bookmarkForm = document.getElementById("bookmark-form");

window.onload = function () {
  addUsersToDropDown();
  listenForUserChange();

  bookmarkForm.addEventListener("submit", addBookmark);
};


function listenForUserChange() {
  selectUser.addEventListener("change", function () {
    const selectedUserId = selectUser.value;

    if (selectedUserId === "") {
      bookmarkForm.hidden = true;
      userBookmarks.innerHTML = "";
      return;
    } else {
      bookmarkForm.hidden = false;
      const bookmarks = getData(selectedUserId);
      renderBookmarks(bookmarks);
    }
  });
}

function renderBookmarks(bookmarksPlaceholder) {
  userBookmarks.innerHTML = "";
  if (bookmarksPlaceholder === null || bookmarksPlaceholder.length === 0) {
    userBookmarks.textContent = "User has no bookmarks";
    return;
  }

  const sortedBookmarks = sortBookmarks(bookmarksPlaceholder);

  for (const bookmark of sortedBookmarks) {
    const bookmarkDiv = document.createElement("div");

    const titleLink = document.createElement("a");
    titleLink.href = bookmark.url;
    titleLink.target = "_blank";
    titleLink.textContent = bookmark.title;

    const description = document.createElement("p");
    description.textContent = bookmark.description;

    const createdAt = document.createElement("p");
    createdAt.textContent =
      "Created: " + new Date(bookmark.createdAt).toLocaleString();

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy URL";

    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(bookmark.url);
    });
    const likeButton = document.createElement("button");
    likeButton.textContent = `Like: ${bookmark.likes}`;

    likeButton.addEventListener("click",()=>{
       bookmark.likes++;

       const selectedUserId = selectUser.value;

       setData(selectedUserId, bookmarksPlaceholder);

       renderBookmarks(bookmarksPlaceholder);
    })

    bookmarkDiv.append(
      titleLink,
      description,
      createdAt,
      copyButton,
      likeButton,
    );

    userBookmarks.append(bookmarkDiv);
  }
}


function addUsersToDropDown() {
  for (const user of users) {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = `User ${user}`;
    selectUser.append(option);
  }
}
 


function addBookmark(event) {
  event.preventDefault();

  const selectedUserId = selectUser.value;
  if (selectedUserId === "") return;

  const bookmarks = getData(selectedUserId) || [];

  const url = document.getElementById("bookmark-url").value.trim();
  const title = document.getElementById("bookmark-title").value.trim();
  const description = document.getElementById("bookmark-description").value.trim();

  if (!url || !title || !description) {
    alert("Please enter valid values.");
    return;
  }

  const bookmark = {
    id: Date.now(),
    url,
    title,
    description,
    createdAt: new Date().toISOString(),
    likes: 0,
  };


  bookmarks.push(bookmark);

  setData(selectedUserId, bookmarks);

  renderBookmarks(bookmarks);

  bookmarkForm.reset();
}
