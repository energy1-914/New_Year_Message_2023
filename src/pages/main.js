import BASE_URL, { POSTS_URL } from "../../config.js";

const layout = document.getElementById("layout");
let postList = [];
let template = `
      <div class="header">
        <h2>what's your 2023 message ?</h2>
      </div>
      <div class="main">
        <a class="newPost" href="">
          <img class="pencil" src="https://cdn-icons-png.flaticon.com/512/650/650143.png">
          new post
        </a>
        <div class="postList">
          {{__post_list__}}
        </div>
      </div>
`;

class View {
  static render(length, posts) {
    for (let i = 0; i < length; i++) {
      postList.push(`
      <a class ="post" href="">
      <img class="randomImg" src="https://blog.kakaocdn.net/dn/Of181/btq4ID0fTeT/wftn2VI2aeYhGzarOLHn50/img.jpg">
      <span>${posts[i].title}</span>
      </a>
      `);
    }
    template = template.replace("{{__post_list__}}", postList.join(""));
    layout.innerHTML = template;
  }
}

async function get(path) {
  // const url = BASE_URL + `/${path}`;
  const url = POSTS_URL;

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) return data;
  else throw Error(data);
}

//실행부
get("posts")
  .then(data => {
    let length = data.data.posts.length;
    let posts = data.data.posts;
    View.render(length, posts);
    console.log("성공", data);
  })
  .catch(error => console.log("에러", error));

