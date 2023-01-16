// api 요청 처리 파일
import BASE_URL, { POSTS_URL } from "../../config.js";


export class Api {
  static async get(path) {
    // const url = BASE_URL + `/${path}`;
    const url = POSTS_URL;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) return data;
    else throw Error(data);
  }
}
