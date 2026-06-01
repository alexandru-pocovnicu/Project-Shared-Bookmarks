// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";
const users = getUserIds(); //get the users IDs from storage.js
const selectUser = document.querySelector("#user-dropdown-list");
const userBookmarks = document.getElementById("user-bookmarks");
const bookmarkForm = document.getElementById("bookmark-form");

window.onload = function () {
  addUsersToDropDown();
  listenForUserChange();
};

// listen for user changes and render that user's bookmarks
function listenForUserChange() {
  selectUser.addEventListener("change", function () {
    const selectedUserId = selectUser.value;

    if (selectedUserId === "") {
      userBookmarks.innerHTML = "";
      return;
    }
    const bookmarks = getData(selectedUserId);
    renderBookmarks(bookmarks);
  });
}

function renderBookmarks(bookmarksPlaceholder) {
  
  userBookmarks.innerHTML = "";
  if (bookmarksPlaceholder === null || bookmarksPlaceholder.length === 0) {
   
    userBookmarks.textContent = "User has no bookmarks";
    return;
  }
  for (const bookmark of bookmarksPlaceholder) {
    const bookmarkDiv = document.createElement("div");

  bookmarkDiv.innerHTML = `
    <a href="${bookmark.url}" target="_blank">
      ${bookmark.title}
    </a>
    <p>${bookmark.description}</p>
    <p>${bookmark.createdAt}</p>
  `;

  userBookmarks.append(bookmarkDiv);
  }
}

//add users from the storage.js file to <select>
function addUsersToDropDown() {
  for (const user of users) {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = `User ${user}`;
    selectUser.append(option);
  }
}

//add submit and add bookmark to the current user

bookmarkForm.addEventListener("submit", addBookmark);//might need to go inside a function

function addBookmark(event) {
  event.preventDefault();

  const selectedUserId = selectUser.value;

  const bookmarks = getData(selectedUserId) || [];

  const bookmark = {
    id: Date.now(),
    url: document.getElementById("bookmark-url").value,
    title: document.getElementById("bookmark-title").value,
    description: document.getElementById("bookmark-description").value,
    createdAt: new Date().toISOString(),
    likes: 0
  };

  bookmarks.push(bookmark);

  setData(selectedUserId, bookmarks);

  renderBookmarks(bookmarks);

  bookmarkForm.reset();
}

//add sort by date button

const sortedBookmarks = [...bookmarksPlaceholder].sort(
  (a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
);

//add copy to clipboard button

const copyButton = document.createElement("button");
copyButton.textContent = "Copy URL";

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(bookmark.url);
});

//add likes

const likeButton = document.createElement("button");
likeButton.textContent = `Like (${bookmark.likes})`