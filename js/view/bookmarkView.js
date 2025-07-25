export const bookmarkView = function (bmposts) {
  // console.log(bmposts);
  const bookmarkUL = document.querySelector("#bookmarks-list");
  bookmarkUL.innerHTML = "";

  bmposts.map((post) => {
    const html = `
            <li class="bookmark-item" data-id="${post.id}">
              <div class="bookmark-content">
                <h4 class="bookmark-title">${post.title}</h4>               
                 <button class="btn--icon btn--remove btn--delete" title="Remove Bookmark"
                >❌</button
              >
              </div>
            </li>
        `;

    bookmarkUL.insertAdjacentHTML("afterbegin", html);
  });
};
// &times;