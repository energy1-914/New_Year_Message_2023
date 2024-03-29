import { COMMENT_URL, POST_URL } from "../../config";
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
          <img
            class="icon"
            id = "deleteIcon"
            src="https://cdn-icons-png.flaticon.com/512/7945/7945112.png"
          />
        </div>
      </div>
      <section>
      <div id="line"/>
        <form>
          <div class="commentForm">
            <input name="content" class="commentInput" type="text" />
            <button type="submit" class="commentBtn" > 
              <image class="buttonIcon" src="https://cdn-icons-png.flaticon.com/512/9446/9446874.png">
            </button>
          </div>  
        </form>   
      </section>
    </article>
  </main>
`;

export class PostContentView {
  constructor() {
    this.url;
    this.title;
    this.content;
    this.template;
    this.commentUrl
  }
  static render(post, date) {
    document.querySelector("link").setAttribute("href", "src/css/postContent.scss?ver0.1");
    this.url = POST_URL + `/${post.postId}`;
    this.title = `${post.title}`;
    this.content = `${post.content};`;
    layout.innerHTML = template;
    document.title = `${post.title}`;

    postInformation.push(`
      <span id="clock">${date}</span>
      <h2 id = "title">${post.title}</h2>
      <p id = "text">${post.content}</p>
    `);
    imageInformation.push(`
      <image
      class="postImg"
      src="${post.image}"
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
    this.setComment();
    this.deleteComment(this.commentUrl);
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
              id = "patchInput"
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

      Api.patch(this.url, this.title, this.content).then(() => {
        location.reload(true);
      });
    });
  }

  static setComment() {
    let url = this.url.replace("post", "comment");
    const form = document.querySelector("form");
    const line = document.querySelector("#line");
    form.onsubmit = e => {
      e.preventDefault();
      let formData = new FormData(form);
      let body = {};
      for (let [key, value] of [...formData]) {
        body[key] = value;
      }
      Api.post(url, body)
        .then(data => {
          let objData = JSON.parse(data);
          let content = objData.data.content;
          let line = document.querySelector("#line");
          let contentInformation = [];
          let commentId = objData.data.commentId;
          this.commentUrl = COMMENT_URL + "/" + commentId;
          let commentInput = document.querySelector(".commentInput");
          window.localStorage.setItem(Date.now(), content);
          contentInformation.push(`
            <div class="comment">
              <p class="commentPtag">${content}</p>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2087/2087825.png" 
                class="deleteComment"          
                >
            </div>
          `);
          line.insertAdjacentHTML("afterbegin", contentInformation.join(""));
          this.template = layout.innerHTML;
          commentInput.value = "";
          // location.reload(true);
        })
        .catch(error => console.log("err: ", error));
    };
    if (line.childElementCount === 1 && localStorage.length > 0) {
      let length = localStorage.length;

      for (let i = 0; i < length; i++) {
        let contentInformation = [];
        let key = localStorage.key(i);
        let comment = localStorage.getItem(key);

        contentInformation.push(`
          <div class="comment">
            <p class="commentPtag">${comment}</p>
            <img 
            src="https://cdn-icons-png.flaticon.com/512/2087/2087825.png" 
            class="deleteComment"          
            >
          </div>
        `);
        line.insertAdjacentHTML("afterbegin", contentInformation.join(""));
        this.template = layout.innerHTML;
      }
    }
  }

  static deleteComment(url) {
    const deleteComment = document.querySelector(".deleteComment");
    deleteComment.addEventListener("click", async () => {
      await Api.delete(url);
      deleteComment.parentNode.remove();
    });
  }
}