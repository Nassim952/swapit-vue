import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./routes";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './index.css';
import VueSimpleAlert from "vue-simple-alert";
import Skeleton from 'vue-loading-skeleton';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleAlert);
Vue.use(Skeleton)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");