import { POSTS_URL, POST_URL } from "../../config.js";

export class Api {
  static async get() {
    const url = POSTS_URL;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) return data;
    else throw Error(data);
  }

  static async post(body) {
    const url = POST_URL;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const data = await response.text();

    if (response.ok) {
      // console.log("응답 정상");
      return data;
    } else {
      // console.log("에러~!~!!~", Error(data));
      throw Error(data)
    }
  }
}
