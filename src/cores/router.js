import { MainView } from "../pages/main";
import { NewPostView } from "../pages/newPost";
import { Api } from "./api";

export class Router {
  // constructor() {
  //   window.addEventListener("hashchange", this.route.bind(this));
  // }

  static route() {
    const routePath = location.hash;

    if (routePath === "") {
      Api.get()
        .then(data => {
          let length = data.data.posts.length;
          let posts = data.data.posts;
          MainView.render(length, posts);
          console.log("성공", data);
        })
        .catch(error => console.log("에러", error));
    } else if (routePath.includes("#/postlist/")) {
      // 해당 포스트내용 여는 함수 구현
      console.log("미구현");
    } else if (routePath.includes("#/newpost")) {
      NewPostView.render();
    }
  }
}
