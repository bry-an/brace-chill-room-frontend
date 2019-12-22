import axios from 'axios';

const getAccessToken = () => {
  let token = null;
  if (typeof localStorage['spotify-token'] !== 'undefined') {
    token = localStorage['spotify-token'];
    return token;
  }
  return token;
};

const getRefreshToken = () => {
  let token = null;
  if (typeof localStorage['spotify-refresh-token'] !== 'undefined') {
    token = localStorage['spotify-refresh-token'];
    return token;
  }
  return token;
};

// const setAccessToken = (token) => {
//   if (token) {
//     localStorage.set('spotify-token', token);
//   }
// };

const $axios = axios.create({
  baseURL: 'https://api.spotify.com/',
  headers: { Authorization: `Bearer ${getAccessToken()}` },
});


export default {
  checkLocalToken() {
    return typeof localStorage['spotify-token'] !== 'undefined';
  },
  async getCurrentPlayingTrack() {
    const currentWindowLocation = window.location.href;
    const response = await $axios.get('v1/me/player/currently-playing/')
      .then(data => data.data)
      .catch((e) => {
        console.log(e.message);
        if (e.message === 'Request failed with status code 401') {
          window.location = `http://localhost:3001/refresh_token?refresh_token=${getRefreshToken()}&origin=${currentWindowLocation}`;
        }
      });
    return response;
  },

};
