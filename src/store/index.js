import { createStore } from 'vuex';
import auth from './auth';
import projects from './projects';

export default createStore({
  modules: {
    auth,
    projects
  }
})
