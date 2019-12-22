<template>
  <h1>Please wait while redirecting.</h1>
</template>

<script>
export default {
  name: 'AuthCallback',
  props: {
    origin: {
      type: String,
      default() {
        return '';
      },
    },
    token: {
      type: String,
      default() {
        return '';
      },
    },
    refresh: {
      type: String,
      default() {
        return '';
      },
    },
  },
  mounted() {
    if (!this.origin) {
      this.$router.push({ name: 'home' });
    } else {
      console.log('setting local storage', this.token, this.refresh);
      localStorage.setItem('spotify-token', this.token);
      localStorage.setItem('spotify-refresh-token', this.refresh);
    //   window.location = this.origin;
    }
  },
};
</script>

<style>

</style>
