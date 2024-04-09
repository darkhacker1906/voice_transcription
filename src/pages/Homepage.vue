<template>
  <div class="main_div">
    <div class="music_div">
      <button @click="handleClick()">Upload your mp3</button>
      <input
      type="file"
      id="file"
      ref="file"
      style="display: none;"
      v-on:change="handleFileUpload()"
    />
</div>
<div v-if="audioUrl" class="audio_div">
 <audio controls :src="audioUrl"></audio>
</div>
  </div>
</template>

<script>
export default {
    data(){
        return{
       data:this.$store.state,
       audioUrl:null,
        }
    },
  methods: {
    checkList(){
        console.log('Hello');
        this.$store.dispatch('fetchData');
    },
    handleClick() {
      this.$refs.file.click();
    },
    handleFileUpload() {
    //   this.file = this.$refs.file.files[0];
      const file= this.$refs.file.files[0];
       if (file) {
        this.audioUrl = URL.createObjectURL(file);
        this.uploading = false;
      }
    },
  },
};
</script>

<style scoped>
.main_div {
  padding: 20px;
  height: 100vh;
  /* background: #CB30FE #8A4EFF; */
  /* background-image: linear-gradient(to right,#CB30FE, #8A4EFF); */
  /* background: rgb(234, 234, 234); */
  overflow-x: hidden;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
}
.m_div{
    padding: 10px 0px;
}
.music_div {
  width: 300px;
  height: 80px;
  margin: 200px auto;
  /* top: 400px; */
}
button {
  width: 100%;
  height: 100%;
  font-size: 23px;
  background: #D9D9D9;
  border:none;
}
#file{
padding:10px
}
</style>