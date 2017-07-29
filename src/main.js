// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;

/* eslint-disable no-new */

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
