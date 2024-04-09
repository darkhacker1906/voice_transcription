<template>
  <div class="main_div">
    <div class="music_div">
      <button @click="handleClick()">Select file to upload</button>
      <input
        type="file"
        id="file"
        ref="file"
        style="display: none"
        v-on:change="handleFileUpload()"
      />
    </div>
    <Player :audio-url="audioUrl" :transcript-data="transcriptData"  />
    <!-- <div class="text"> -->
      <!-- <p v-if="data && data.data && data.data.full_transcript">{{ data.data.full_transcript }}</p>  -->

    <!-- </div> -->
  </div>
</template>

<script>
import Player from "../components/player/Player.vue";
import { mapState, mapActions  } from 'vuex';
export default {
  components: { Player },
  data() {
    return {
      audioUrl: null,
    };
  },
  computed: {
    ...mapState(['data', 'loading']),
    transcriptData() {
      if (this.data && this.data.data && this.data.data.transcript_time) {
        return this.data.data.transcript_time;
      }
      return [];
    }
  },
  methods: {
    ...mapActions(['fetchData']),
    handleClick() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      const file = this.$refs.file.files[0];
      if (file) {
        this.audioUrl = URL.createObjectURL(file);
        this.$store.commit('resetReducer');
        this.$store.dispatch("fetchData", file);
      }
    },
  },
};
</script>

<style scoped>
.main_div {
  padding: 20px;
}
.m_div {
  padding: 10px 0px;
}
.music_div {
  width: 300px;
  height: 80px;
  margin: 200px auto;
}
button {
  width: 100%;
  height: 100%;
  font-size: 23px;
  background: #d9d9d9;
  border: none;
}
#file {
  padding: 10px;
}
.text {
  height: auto;
  padding: 20px;
  border: 1.5px solid rgb(236, 234, 234);
}
</style>