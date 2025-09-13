let IS_PROD = true;


const server = {
    prod: IS_PROD ? "https://desi-talks.onrender.com" : "http://localhost:5000",
    dev: "http://localhost:5000"
};

export default server;