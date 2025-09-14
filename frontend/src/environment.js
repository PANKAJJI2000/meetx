const server = {
    prod: 'https://vcbackend-cx24.onrender.com',
    dev: 'http://localhost:3000'
};

const current = window.location.hostname === 'localhost' ? server.dev : server.prod;

export default current;