let IS_PROD = true; // Change this to false for development


const server = {
    prod: 'https://meetx-1-en8z.onrender.com', // Your actual backend URL
    dev: 'http://localhost:3000'
};

const server_url = IS_PROD ? server.prod : server.dev;

// Always use the backend URL, never the current domain
export default server_url;