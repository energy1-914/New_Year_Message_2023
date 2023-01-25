import { POST_URL } from "../../config";
import { Api } from "../cores/api";
const layout = document.getElementById("layout");

let template = `
  <div class="header">
    <a href="#">
      <img
        class="arrowIcon"
        src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
      />
    </a>
    <h2>HPNY 2023</h2>
  </div>
  <main class="main">
    <form>
      <button name="image" class="newImg" href="">랜덤이미지 추가하기</button>
      <div class="post">
        <h3>Title</h3>
        <input
          name="title"
          class="inputTitle"
          type="text"
          placeholder="글 제목을 작성해주세요."
        />
      </div>
      <div class="post">
        <h3>Content</h3>
        <textarea
          name= "content"
          class="content"
          type="text"
          placeholder="글 내용을 작성해주세요."
        ></textarea>
      </div>
      <button class="upload" type="submit">게시하기</button>
    </form>  
  </main>
`;

export class NewPostView {
  static render() {
    layout.innerHTML = template;
    document.title = "새 포스트 작성";
    document.querySelector("link").setAttribute("href", "src/css/newPost.scss?ver0.1");
    this.post();
  }

  static post() {
    const form = document.querySelector("form");
    form.onsubmit = e => {
      e.preventDefault();
      let formData = new FormData(form);
      let body = {
        image:
          "https://blog.kakaocdn.net/dn/Of181/btq4ID0fTeT/wftn2VI2aeYhGzarOLHn50/img.jpg",
      }; // image : 더미데이터
      for (let [key, value] of [...formData]) {
        body[key] = value;
      }
      Api.post(POST_URL, body)
        .then(() => {
          location.hash = "";
          location.reload(true);
        })
        .catch(() => alert("제목과 내용 모두 작성하시기 바랍니다."));
    };
  }
}
