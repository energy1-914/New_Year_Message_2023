import { POST_URL } from "../../config";
import { Router } from "../cores/router";
import { Api } from "../cores/api";

const layout = document.getElementById("layout");
let imageInformation = [];
let postInformation = [];
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
  <main>
    <article>
      {{__post_image__}}
      <div class="contentGroup">
        {{__post_information__}}
        <div class="icons">
          <image
            class="icon"
            id= "patchIcon"
            src="https://cdn-icons-png.flaticon.com/512/7175/7175385.png"
          />
          <image
            class="icon"
            id = "deleteIcon"
            src="https://cdn-icons-png.flaticon.com/512/7945/7945112.png"
          />
        </div>
      </div>
    </article>
    <section>댓글자리</section>
  </main>
`;

export class PostContentView {
  constructor() {
    this.url;
    this.title;
    this.content;
    this.template;
  }
  static render(title, content, image, date, postId) {
    // const link = document.getElementsByTagName("link");
    // link.setAttribute("href", "src/css/postContent.scss?after");
    this.url = POST_URL + `/${postId}`;
    this.title = `${title}`;
    this.content = `${content};`;
    layout.innerHTML = template;
    document.title = `${title}`;

    postInformation.push(`
      <span id="clock">${date}</span>
      <h2 id = "title">${title}</h2>
      <p id = "text">${content}</p>
    `);
    imageInformation.push(`
      <image
      class="postImg"
      src="${image}"
      />`);

    template = template.replace(
      "{{__post_information__}}",
      postInformation.join("")
    );
    template = template.replace(
      "{{__post_image__}}",
      imageInformation.join("")
    );
    layout.innerHTML = template;
    this.template = template;
    document.getElementById("patchIcon").addEventListener("click", () => {
      this.renderPatchView();
    });
    this.delete();
  }

  static delete() {
    const deleteIcon = document.getElementById("deleteIcon");
    deleteIcon.addEventListener("click", () => {
      Api.delete(this.url);
      location.hash = "";
    });
  }

  static renderPatchView() {
    let newTemplate = `
          <div class="post">
            <input
              type="text"
              value= "${this.title}"
            />
            <textarea
              type="text"
              value = "${this.content}"
            ></textarea>
          </div>
          <button class="upload" href="">수정하기</button>`;

    let contentGroup = document.querySelector(".contentGroup");

    while (contentGroup.firstChild) {
      contentGroup.removeChild(contentGroup.firstChild);
    }
    contentGroup.insertAdjacentHTML("afterbegin", newTemplate);

    document.querySelector("button").addEventListener("click", () => {
      this.title = document.querySelector("input").value;
      this.content = document.querySelector("textarea").value;
      Api.patch(this.url, this.title, this.content)
        .then(() => {
          this.render();
          location.reload(true);
        });
    });
  }
}
