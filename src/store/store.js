import { createStore } from "vuex";
import axios from "axios";
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
      state.loading = true;
      state.isError = false;
    },
    callSuccessful(state, action) {
      state.loading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action };
    },
    hasError: (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = { ...action };
    },
    resetReducer: (state, action) => {
      state.isError = false;
      state.loading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
  actions: {
    async fetchData( context , file) {
      const data = new FormData();
      data.append("file", file);
      data.append('fileType', 'mp3');
      context.commit("startLoading");
      try {
        const response = await axios.post("http://cf4a-119-82-95-81.ngrok-free.app/transcription/",data);
        console.log(response);
        context.commit("callSuccessful", response);
      } catch (e) {
        console.warn(e);
        context.commit("hasError", e);
      }
    },
  },
});
export default store;
