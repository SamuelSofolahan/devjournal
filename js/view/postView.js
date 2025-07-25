export const post = function (postData) {
  const post_ul = document.querySelector("#post-list");
  if (postData.length === 0) {
    post_ul.innerHTML = `<h2 class="post-title">No blogpost yet</h2>`;
    return;
  }
  post_ul.innerHTML = "";
  postData.map((data) => {
    const tags = data.tags
      .split(",")
      .map((tag) => `<li>${tag.trim()}</li>`)
      .join("");

    // console.log(data.title, data.bookmarked, data.notes);

    const truncateNotes = function (str, maxlength) {
      if (str.length > maxlength) {
        return str.slice(0, maxlength) + "...";
      } else {
        return str;
      }
    };
    const html = `
    <article class="post-card" data-id=${data.id}>
        <div class="post-header">
            <h2 class="post-title">${data.title} </h2>
           <div class="post-btns">
              <button class="btn--icon btn--bookmark${
                data.bookmarked ? "-fill" : ""
              }" title="${
      data.bookmarked ? "Remove bookmark" : "Bookmark this post"
    }"

                >🔖</button
              >
              <button class="btn--icon btn--delete" title="Delete post"
                >❌</button
              >
              <!-- <button class="btn--icon btn--edit" title="Edit post"
                >📝</button
              > -->
            </div>
        </div>
        <p class="post-meta">By ${data.name} • ${data.date}</p>
         <div class="postTags">
            <ul>
            ${tags}
            <!--  <li>${data.tags.trim()}</li> -->
            </ul>
          </div>
        <p class="post-excerpt">
        <!-- ${data.notes} -->
        ${truncateNotes(data.notes, 350)}
        </p>
        <a href="#!" class="btn btn--link">Read More →</a>
    </article>
    `;

    post_ul.insertAdjacentHTML("afterbegin", html);
  });
};
