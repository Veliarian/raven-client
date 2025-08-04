import "./style/index.css";

import Button from './components/Button.vue';

export { Button };

export default {
    install(app) {
        app.component('FButton', Button);
    },
};
