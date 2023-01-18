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
      <div class="content">
        {{__post_information__}}
        <div class="icons">
          <image
            class="icon"
            src="https://cdn-icons-png.flaticon.com/512/7175/7175385.png"
          />
          <image
            class="icon"
            src="https://cdn-icons-png.flaticon.com/512/7945/7945112.png"
          />
        </div>
      </div>
    </article>
    <section>댓글자리</section>
  </main>
`;

export class PostContentView {
  static render(title, content, image, date) {
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
    location.href = location.href;
        // location.reload();
  }
}