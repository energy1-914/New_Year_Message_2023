import { POSTS_URL } from "../../config.js";

export class Api {
  static async get() {
    const url = POSTS_URL;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) return data;
    else throw Error(data);
  }

  static async post(url, body) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const data = await response.text();

    if (response.ok) {
      return data;
    } else {
      throw Error(data);
    }
  }

  static async delete(url) {
    await fetch(url, { method: "DELETE" })
      .then(response => response.text())
      .then(data => {
        return data;
      })
      .catch(error => console.log("err: ", error));
  }

  static async patch(url, title, content) {
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
  }
}
