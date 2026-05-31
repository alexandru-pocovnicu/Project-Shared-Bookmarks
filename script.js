// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";
const users = getUserIds(); //get the users IDs from storage.js
const selectUser = document.querySelector("#user-dropdown-list");

window.onload = function () {
  addUsersToDropDown();
  getUserBookmark();
};

//function to get each user's bookmarks/ an array of bookmarks
function getUserBookmark() {
  selectUser.addEventListener("change", function () {
    const selectedUserId = selectUser.value;
    const bookmarks = getData(selectedUserId);
    renderBookmarks(bookmarks);
  });
}

function renderBookmarks(bookmarksPlaceholder) {
  const userBookmarks = document.getElementById("user-bookmarks");
  userBookmarks.innerHTML = "";
  if (bookmarksPlaceholder === null || bookmarksPlaceholder.length === 0) {
    userBookmarks.textContent = "User has no bookmarks";
    return;
  }
  for (const bookmark of bookmarksPlaceholder) {
  }
}

//add users from the storage.js file to <select>
function addUsersToDropDown() {
  for (const user of users) {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = user;
    selectUser.append(option);
  }
}
