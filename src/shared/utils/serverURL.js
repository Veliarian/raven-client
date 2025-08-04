const isLocal = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const serverURL = isLocal()
    ? 'http://localhost:8080/v1'
    : 'http://192.168.1.129:8080/v1';