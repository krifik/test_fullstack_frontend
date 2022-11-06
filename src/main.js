import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./routes";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

library.add(faRightToBracket);
library.add(faPlus);
library.add(faCircleNotch);
library.add(faXmark);
createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).use(createPinia()).mount("#app");
