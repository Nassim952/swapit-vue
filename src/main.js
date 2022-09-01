import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./routes";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './index.css';
import VueSimpleAlert from "vue-simple-alert";
import Skeleton from 'vue-loading-skeleton';
import loading from 'vuejs-loading-screen';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSimpleAlert);
Vue.use(Skeleton)
Vue.use(loading, {
  bg: '#41b883ad',
  slot: `
    <div class="px-5 py-3 bg-gray-800 rounded">
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      <h3 class="text-3xl text-white"> Veuillez patientez...</h3>
    </div>
  `
})

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");