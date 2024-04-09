<template>
  <div class="audio_div">
    <audio controls :src="audioUrl" ref="audio"></audio>
    <!-- <media-player
      playsInline
      load="visible"
      poster-load="visible"
      title="Sprite Fight"
      :src="[{ src: audioUrl, type: 'audio/mpeg' }]"
      ref="audio"
    >
      <media-provider></media-provider>
      <media-audio-layout></media-audio-layout>
      <media-video-layout></media-video-layout>
    </media-player> -->

    <ul class="padding_div">
      <v-progress-circular
        v-if="this.loading"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <div
        v-for="segment in transcriptData"
        :key="segment.id"
        ref="segmentRefs"
      >
        <div
          v-if="currentSegment && currentSegment.id === segment.id"
          class="highlight"
        >
          {{ segment.lines[0] }}
        </div>
        <div v-else>
          {{ segment.lines[0] }}
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import "vidstack/bundle";
import { mapState } from "vuex";
export default {
  name: "Player",
  props: {
    audioUrl: {
      type: String,
      required: true,
    },
    transcriptData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentTime: 0,
      currentSegment: null,
    };
  },
  methods: {
    updateCurrentSegment() {
      const { currentTime, transcriptData } = this;
      this.currentSegment = transcriptData.find(
        (segment) =>
          parseFloat(segment.begin) <= currentTime &&
          parseFloat(segment.end) >= currentTime
      );
    },
  },
  computed: {
    ...mapState(["data", "loading"]),
  },
  mounted() {
    const audio = this.$refs.audio;
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      this.updateCurrentSegment();
    });
  },
};
</script>

<style scoped>
.audio_div {
  padding: 40px 20px;
  border: 1.5px solid #d4d2d2;
  background: #e0e4f8;
  /* padding: 20px; */
}
audio {
  width: 100%;
}
.highlight {
  color: red;
  /* background: #6366f1; */
}
.padding_div {
  padding: 20px;
}
</style>