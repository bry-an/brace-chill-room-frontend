import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
const accessToken = localStorage.getItem('spotify-token');

const getAccessToken = () => {
  let token = null;
  if (typeof localStorage['spotify-token'] !== 'undefined') {
    token = JSON.parse(localStorage['spotify-token']);
    return token;
  }
  return token;
};

const $axios = axios.create({
  baseUrl: 'https://api.spotify.com/',
  headers: { Authorization: `Bearer ${getAccessToken()}` },
});

export default {
  checkLocalToken() {
    return typeof localStorage['spotify-token'] !== 'undefined';
  },
  async getCurrentPlayingTrack() {
    const response = await $axios.get('v1/me/player/currently-playing/')
      .then(data => data.data);
    return response;
  },

};
