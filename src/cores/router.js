import { MainView } from "../pages/main";
import { NewPostView } from "../pages/newPost";
import { Api } from "./api";

export class Router {
  static route() {
    const routePath = location.hash;

    if (routePath === "") {
      Api.get("posts")
        .then(data => {
          let length = data.data.posts.length;
          let posts = data.data.posts;
          MainView.render(length, posts);
          console.log("성공", data);
        })
        .catch(error => console.log("에러", error));
    } else if (routePath.indexOf("/postlist/") >= 0) {
      // 해당 포스트내용 여는 함수 구현
      console.log('미구현')
    } else if (routePath.indexOf("/newpost") >= 0) {
      NewPostView.render();
    }
  }
}