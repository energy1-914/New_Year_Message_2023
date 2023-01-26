const layout = document.getElementById("layout");
let postList = [];
let template = `
      <div class="header">
        <h2>What's your 2023 message ?</h2>
      </div>
      <div class="createPost">
        <a class="newPost" href="#/newpost">
          <img class="pencil" src="https://cdn-icons-png.flaticon.com/512/1665/1665628.png">
          <span>
            새 글 작성하기
          </span>
        </a>
      </div>
      <ul class="postList">
          {{__post_list__}}
      </ul>
`;

export class MainView {
  static render(length, posts) {
    for (let i = 0; i < length; i++) {
      postList.push(`
      <li class = "post">
        <a class = "innerPost" href="#/postlist/${posts[i].title}/${i}">
          <img class="randomImg" src="${posts[i].image}">
          <article>
            <strong>${posts[i].title}</strong>
            <p>${posts[i].content}</p>
          </article>
        </a>
      </li>
      `);
    }
    template = template.replace("{{__post_list__}}", postList.join(""));
    layout.innerHTML = template;
  }
}
