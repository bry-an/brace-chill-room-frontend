const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export default {
  spotifyLogin() {
    const loginURL = `${baseURL}/login`;
    fetch(loginURL).then((data) => {
      console.log(data.json());
    });
    console.log('spotify login');
  },
};
