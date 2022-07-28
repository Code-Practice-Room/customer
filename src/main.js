import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

Vue.use(VueAxios, axios);
Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
