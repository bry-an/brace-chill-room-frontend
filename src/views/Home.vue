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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  computed: {
    loginURL() {
      const baseURL = process.env.VUE_APP_API_BASE_URL;
      return `${baseURL}/login/?origin=${window.location}`;
    },
  },
  methods: {
    login() {
      console.log(process.env.VUE_APP_API_BASE_URL);
      window.location = this.loginURL;
    },
  },
};
</script>
