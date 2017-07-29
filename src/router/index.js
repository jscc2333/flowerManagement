import Vue from 'vue';
import Router from 'vue-router';
import flower from '@/components/flower/flower';
import tip from '@/components/tip/tip';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/flower',
    name: 'flower',
    component: flower
  },
  {
    path: '/tip',
    name: 'tip',
    component: tip
  }
  ]
});
