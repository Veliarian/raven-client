const isLocal = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const serverURL = isLocal()
    ? 'http://localhost:8080/v1'
    : 'https://your-production-server.com/v1';