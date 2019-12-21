<template>
  <div>
    <div class="home">
      <h1>Welcome to Brace Chill Room</h1>
      👩‍🎤👨‍🎤
    </div>
    <div>
      <h3>First, you should log in to spotify</h3>
      <button @click="routeToLogin">
        Login to Spotify
      </button>
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
  methods: {
    routeToLogin() {
      API.spotifyLogin();
    },
  },
};
</script>
