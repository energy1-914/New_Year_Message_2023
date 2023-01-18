import { Router } from "./cores/router";

window.addEventListener("hashchange", Router.route);
Router.route();