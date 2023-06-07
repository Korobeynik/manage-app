import { createStore } from "vuex";
import register from "./modules/register";

const store = createStore({
  modules: {
    register,
  },
});

export default store;
