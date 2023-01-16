const layout = document.getElementById("layout");

let template = `
<div class="header">
        <a href="">
          <img
            class="arrowIcon"
            src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
          />
        </a>
        <h2>HPNY 2023</h2>
      </div>
      <main class="main">
        <button class="newImg" href="">랜덤이미지 추가하기</button>
        <div class="post">
          <h3>Title</h3>
          <input
            class="title"
            type="text"
            placeholder="글 제목을 작성해주세요."
          />
        </div>
        <div class="post">
          <h3>Content</h3>
          <textarea
            class="content"
            placeholder="글 내용을 작성해주세요."
          ></textarea>
        </div>
        <button class="upload" href="">게시하기</button>
      </main>
`;

export class NewPostView {
  static render() {
    layout.innerHTML = template;
    document.title = "새 포스트 작성";
    document.querySelector("link").setAttribute("href", "src/css/newPost.scss"); //왜 안돼ㅜ
  }
}

