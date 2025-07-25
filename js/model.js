export const state = {
  newPostArr: [],
  bookmarks: [],
};

const setLocalstorage = function () {
  localStorage.setItem("post", JSON.stringify(state.newPostArr));
};
const getLocalStorage = function () {
  const post = localStorage.getItem("post");
  if (!post) return;

  state.newPostArr = JSON.parse(post);
};

getLocalStorage();

const setbookmarksLS = function () {
  localStorage.setItem("BMpost", JSON.stringify(state.bookmarks));
};

const getLocalStorageBM = function () {
  const BMpost = JSON.parse(localStorage.getItem("BMpost"));
  if (!BMpost) return;

  state.bookmarks = BMpost;
};
getLocalStorageBM();

export const receivedData = function (post) {
  const id = Date.now();
  const date = new Date();
  const day = date.getDay();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  state.newPostArr.push({
    id: id,
    bookmarked: false,
    title: post.post_title,
    notes: post.post_notes,
    tags: post.post_tags,
    date: `${day}, ${month} ${year}`,
    name: post.author_name,
  });

  setLocalstorage();
};

export const deleteData = function (postId) {
  state.newPostArr = state.newPostArr.filter((post) => post.id !== postId);
  setLocalstorage();
};

export const addBookmark = function (postId) {
  const post = state.newPostArr.find((post) => post.id === postId);
  // if (!post) return;

  const alreadyBookmarked = state.bookmarks.find((bm) => bm.id === post.id);
  if (alreadyBookmarked) return;

  state.bookmarks.push({
    id: post.id,
    bookmarked: true,
    title: post.title,
    notes: post.notes,
    tags: post.tags,
    date: post.date,
    name: post.name,
  });

  // state.newPostArr.bookmarked = true;
  // post.alreadyBookmarked = true;
  post.bookmarked = true;
  // if (state.bookmarks.id === state.newPostArr.id) post.bookmarked = true;
  // state.newPostArr.bookmarked = true;

  setbookmarksLS();
};

export const removeBookmark = function (postId) {
  const post = state.newPostArr.find((post) => post.id === postId);
  if (post) post.bookmarked = false;

  state.bookmarks = state.bookmarks.filter((obj) => obj.id !== postId);

  setbookmarksLS();
};
