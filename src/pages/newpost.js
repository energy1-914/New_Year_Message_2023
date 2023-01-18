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
        <button class="upload" type="submit" href="">게시하기</button>
      </form>  
      </main>
`;

export class NewPostView {
  static render() {
    layout.innerHTML = template;
    document.title = "새 포스트 작성";
    // document.querySelector("link").setAttribute("href", "src/css/newPost.scss");
    this.upload();
  }

  static upload() {
    const form = document.querySelector("form");
    form.onsubmit = e => {
      e.preventDefault();
      let formData = new FormData(form);
      let body = { image: "https://blog.kakaocdn.net/dn/Of181/btq4ID0fTeT/wftn2VI2aeYhGzarOLHn50/img.jpg" }; // image : 더미데이터
      for (let [key, value] of [...formData]) {
        body[key] = value;
      }

      console.log("formData: ", formData);
      console.log("formData: ", [...formData]); // [['title', 'dd'], ['content', 'dd']]

      Api.post(body)
        .then(response => console.log("성공. post결과 : ", response))
        .catch(error => console.log("에러 : ", error));
    };
  }
}
