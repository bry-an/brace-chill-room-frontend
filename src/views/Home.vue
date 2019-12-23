<template>
  <div>
    <div class="title">
      <h1>Welcome to the Brace Chill Room 👩‍🎤 👨‍🎤</h1>
    </div>
    <div v-if="!isLoggedIn">
      <h3>First, you should log in to spotify</h3>
      <button @click="login">
        Login to Spotify
      </button>
    </div>
    <button @click="getCurrentPlayingTrack">
      {{ currentPlayingTrack ? 'Refresh' : 'Get' }} My Current Track
    </button>
    <div v-if="isLoggedIn">
      <div
        class="playing container"
        v-if="currentPlayingTrack.artist"
      >
        <img
          :src="currentPlayingTrack.albumImage"
          class="album-image"
        >

        <div class="album-info">
          <div>
            <ul>
              <li>
                <b class="subtitle">Current Song</b>
                {{ currentPlayingTrack.song }} by
                <em>{{ currentPlayingTrack.artist }}</em>
              </li>
              <li>
                <b class="subtitle">Current Time</b>
                {{ msToHumanReadable(currentPlayingTrack.progress) }} of
                {{ msToHumanReadable(currentPlayingTrack.duration) }}
              </li>
              <li>
                <b class="subtitle">Current Status</b>
                <i
                  v-if="currentPlayingTrack.isPlaying"
                  class="material-icons"
                  style="vertical-align: bottom"
                >play_circle_filled</i>
                <i
                  v-else-if="!currentPlayingTrack.isPlaying"
                  class="material-icons"
                  style="vertical-align: bottom"
                >stop</i>
              </li>
            </ul>
          </div>
          <div class="last-updated">
            <ul>
              <li>
                <em>Last Updated at: {{ new Date(currentPlayingTrack.lastUpdate) }}</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else-if="!currentPlayingTrack.artist">
        It appears that you're not currently listening to anything on Spotify. Lame.
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/utils/API';
import sample from '@/data/sample.json';

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
      isPlaying: null,
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
      // const currentTrack = await API.getCurrentPlayingTrack();
      const currentTrack = sample;
      this.currentPlayingTrack.artist = currentTrack.item.artists[0].name;
      this.currentPlayingTrack.song = currentTrack.item.name;
      this.currentPlayingTrack.progress = currentTrack.progress_ms;
      this.currentPlayingTrack.lastUpdate = currentTrack.timestamp;
      this.currentPlayingTrack.albumImage = currentTrack.item.album.images[0].url;
      this.currentPlayingTrack.duration = currentTrack.item.duration_ms;
      this.currentPlayingTrack.isPlaying = currentTrack.is_playing;
    },
    msToHumanReadable(milliseconds) {
      const seconds = parseInt(milliseconds / 1000, 10);
      if (seconds < 60) {
        return `0:${seconds}`;
      }
      const minutes = parseInt(seconds / 60, 10);
      let secondsRemaining = seconds % 60;
      secondsRemaining = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
      return `${minutes}:${secondsRemaining}`;
    },
  },
  mounted() {
    if (API.checkLocalToken()) {
      this.getCurrentPlayingTrack();
    }
  },
};
</script>
<style lang="sass" scoped>
.title
  margin-bottom: 10px

.container
  display: flex
  align-items: center
  margin: auto

.playing
  padding-top: 10px
  text-align: left

  .subtitle
    margin-right: 10px
  ul
    list-style: none
  li
    margin-bottom: 10px

  .last-updated
    align-self: flex-end
    flex-grow: 2

  .album-image
    width: 30vw

</style>
