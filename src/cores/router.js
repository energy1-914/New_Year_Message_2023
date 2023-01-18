import { MainView } from "../pages/main";
import { NewPostView } from "../pages/newPost";
import { PostContentView } from "../pages/postContent";
import { Api } from "./api";

export class Router {
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
    } 
    else if (routePath.includes("#/postlist/")) {
      const i = routePath.split("/")[3];
      Api.get().then(data => {
        let title = data.data.posts[i].title;
        let content = data.data.posts[i].content;
        let image = data.data.posts[i].image;
        let date = data.data.posts[i].updatedAt.slice(0, 10).replaceAll('-', '.');
        
        PostContentView.render(title, content, image, date);
        console.log("성공", data);
      });
    } 
    else if (routePath.includes("#/newpost")) {
      NewPostView.render();
    }
  }
}