<template>
  <div>
    <div class="home">
      <h1>Welcome to Brace Chill Room</h1>
      👩‍🎤👨‍🎤
    </div>
    <div>
      <h3>First, you should log in to spotify</h3>
      <button @click="login">
        Login to Spotify
      </button>
    </div>
    <button @click="getCurrentPlayingTrack">
      Get My Current Track
    </button>
    <div v-if="currentPlayingTrack.artist">
      <img
        :src="currentPlayingTrack.albumImage"
        class="album-image"
      >
      <div>
        <h3>You are listening to:</h3>
        {{ currentPlayingTrack.song }} by {{ currentPlayingTrack.artist }}
        <h3>Current Time:</h3>
        You are at {{ currentPlayingTrack.progress / 1000 }} of
        {{ currentPlayingTrack.duration / 1000 }}
        <h3>Last Updated at: {{ new Date(currentPlayingTrack.lastUpdate) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils/API';

export default {
  name: 'Home',
  components: {
  },
  data: () => ({
    currentPlayingTrack: {
      artist: null,
      progress: null,
      duration: null,
      lastUpdate: null,
      song: null,
      albumImage: null,
    },
  }),
  computed: {
    loginURL() {
      const baseURL = process.env.VUE_APP_API_BASE_URL;
      return `${baseURL}/login/?origin=${window.location}`;
    },
    isLoggedIn() {
      return API.checkLocalToken();
    },
    type() {
      return typeof currentTrack;
    },
    lastUpdated() {
      return new Date(this.currentPlayingTrack.lastUpdate);
    },
  },
  methods: {
    login() {
      console.log(process.env.VUE_APP_API_BASE_URL);
      window.location = this.loginURL;
    },
    async getCurrentPlayingTrack() {
      const currentTrack = await API.getCurrentPlayingTrack();
      this.currentPlayingTrack.artist = currentTrack.item.artists[0].name;
      this.currentPlayingTrack.song = currentTrack.item.name;
      this.currentPlayingTrack.progress = currentTrack.progress_ms;
      this.currentPlayingTrack.lastUpdate = currentTrack.timestamp;
      this.currentPlayingTrack.albumImage = currentTrack.item.album.images[0].url;
      this.currentPlayingTrack.duration = currentTrack.item.duration_ms;
    },
  },
};
</script>
<style lang="sass" scoped>

.album-image
  width: 30vw

</style>
