<template>
  <div class="main_div">
    <div class="music_div">
      <button @click="handleClick()">Upload your mp3</button>
      <div v-if="uploading">Uploading your mp3</div>
    </div>
    <input
      type="file"
      id="file"
      ref="file"
      style="display: none"
      v-on:change="handleFileUpload()"
    />
  </div>
</template>

<script>
export default {
    data(){
        return{
       uploading:false,
        }
    },
  methods: {
    handleClick() {
      this.$refs.file.click();
    },
    handleFileUpload() {
        this.uploading=true;
      this.file = this.$refs.file.files[0];
    this.uploading=false;
    },
  },
};
</script>

<style scoped>
.main_div {
  padding: 20px;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.music_div {
  width: 350px;
  height: 80px;
}
button {
  width: 100%;
  height: 100%;
  font-size: 30px;
  background: #D9D9D9;
  border:none;
}
</style>