import * as model from "./model.js";
import { post } from "./view/postView.js";
import { bookmarkView } from "./view/bookmarkView.js";

// Load stored data
post(model.state.newPostArr);
bookmarkView(model.state.bookmarks);

// New Post btn to scroll ✅
const newPostBtn = document.querySelector("#newPostScrollBtn");
newPostBtn.addEventListener("click", function () {
  window.scroll({
    top: 1000,
    left: 1000,
    behavior: "smooth",
  });
});

// Write a post controller ✅
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formDataArr = [...new FormData(form)];
  const formData = Object.fromEntries(formDataArr);

  model.receivedData(formData);
  post(model.state.newPostArr);

  // Clear form
  form.reset();
});

// Control Delete Post 👇👇
// const deleteBtn = document.querySelectorAll(".btn--delete");

// deleteBtn.forEach((btn) => {
//   btn.addEventListener("click", function () {
//     if (!btn) return;
//     const postCard = btn.closest(".post-card");
//     const postId = +postCard.dataset.id;
//     model.deleteData(postId);
//     post(model.state.newPostArr);
//   });
// });

const postListContainer = document.querySelector("#post-list");

postListContainer.addEventListener("click", function (e) {
  const bookmarkBtn = e.target.closest(".btn--bookmark");
  const deleteBtn = e.target.closest(".btn--delete");

  const postCard = e.target.closest(".post-card");
  if (!postCard) return;

  const postId = +postCard.dataset.id;

  // Delete Logic
  if (deleteBtn) {
    model.deleteData(postId);
    post(model.state.newPostArr);
    return;
  }

  // Bookmark Logic
  if (bookmarkBtn) {
    const postItem = model.state.newPostArr.find((p) => p.id === postId);

    if (!postItem.bookmarked) {
      model.addBookmark(postId);
    } else {
      model.removeBookmark(postId);
    }

    post(model.state.newPostArr);
    bookmarkView(model.state.bookmarks);

    return;
  }
});

// const postLists = document.querySelectorAll("#post-list");

// postLists.forEach((postCard) => {
//   postCard.addEventListener("click", function (e) {
//     const btn = e.target.closest(".btn--delete");
//     if (!btn) return;

//     const postCard = btn.closest(".post-card");
//     const postId = +postCard.dataset.id;
//     model.deleteData(postId);
//     post(model.state.newPostArr);
//   });
// });
// Control Delete Post 👆👆

// Control Bookmarks👇👇
// postLists.forEach((postCard) => {
//   postCard.addEventListener("click", function (e) {
//     const btn = e.target.closest(".btn--bookmark");
//     if (!btn) return;

//     const postCard = btn.closest(".post-card");
//     const postId = +postCard.dataset.id;

//     const postItem = model.state.newPostArr.find((p) => p.id === postId);

//     if (!postItem.bookmarked) {
//       model.addBookmark(postId);
//     } else {
//       model.removeBookmark(postId);
//     }

//     post(model.state.newPostArr);
//     bookmarkView(model.state.bookmarks);
//   });
// });

// Remove Bookmarks
const bookmarksUl = document.querySelector("#bookmarks-list");

bookmarksUl.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".btn--delete");
  if (!deleteBtn) return;

  const bookmarkLi = deleteBtn.closest(".bookmark-item");
  const bookmarkId = +bookmarkLi.dataset.id;

  model.removeBookmark(bookmarkId);
  bookmarkView(model.state.bookmarks);
});
