const config = {
    server: {
        port: process.env.PORT ?? 3001,
        cors: {
            origin: "http://localhost:3000"
        }
    }
};

export default config;