TESTING
The website must contain a drop-down which lists five users:

Tested manually by opening the website and checking that User 1 to User 5 appear in the dropdown.

Selecting a user must display the list of bookmarks for the relevant user:

Tested manually by selecting different users and checking their bookmarks are displayed.

If there are no bookmarks for the selected user, a message is displayed:

Tested manually by selecting a user with no bookmarks and checking that "User has no bookmarks" is displayed.

The list of bookmarks must be shown in reverse chronological order:

Unit tests in script.test.js

Each bookmark has a title, description and created at timestamp displayed:

Tested manually by creating bookmarks and checking all fields are visible.

Each bookmark’s title is a link to the bookmark’s URL:

Tested manually by clicking the title and confirming the URL opens.

Each bookmark’s “Copy to clipboard” button copies the URL:

Tested manually by clicking Copy URL and pasting the result into a text editor.

Each bookmark’s like counter works independently and persists data across sessions:

Tested manually by clicking Like, refreshing the page, and verifying the count remained.

The website contains a form with inputs for URL, title and description:

Tested manually by inspecting the page and submitting the form.

Submitting the form adds a new bookmark for the selected user:

Tested manually by creating bookmarks for different users and verifying they appear only for the selected user.

After creating a new bookmark, the updated list is displayed:

Tested manually by submitting the form and confirming the new bookmark appears immediately.

Data persists across sessions:

Tested manually by refreshing the page and verifying bookmarks are still present.

The website must score 100 for accessibility in Lighthouse:

Tested manually using Lighthouse Snapshot mode in Chrome DevTools. The page scored 100 for accessibility.

Unit tests must be written for at least one non-trivial function:

Unit tests in script.test.js test that bookmarks are sorted in reverse chronological order using the sortBookmarks function imported from bookmark.js.