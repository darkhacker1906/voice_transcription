import { createStore } from "vuex";
import axios from 'axios'
const store = createStore({
  state() {
    return {
        loading: false,
        isError: false,
        isSuccess: false,
        data: {},
    };
  },
  mutations: {
    startLoading(state) {
      state.loading=true;
      state.isError=false;
    },
    callSuccessful(state,action){
        state.loading=false;
        state.isError=false;
        state.isSuccess=true;
        state.data={...action}
    },
    hasError: (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.data = { ...action };
      },
      resetReducer:(state,action)=>{
        state.isError = false;
        state.loading = false;
        state.isSuccess = false;
        state.data = {};
      }
  },
  actions:{
    async fetchData({ commit }) {
        commit('startLoading');
        try {
        //   const apiUrl = import.meta.env.VITE_API_URL;
        //   console.log(apiUrl);
      const response=await axios.get('https://dummyjson.com/products');
          commit('callSuccessful',response.data.products);
        } catch (e) {
          console.warn(e);
          commit('hasError', e);
        }
      },

  }
});
export default store;
