import "./style/index.css";

import Button from "./components/Button.vue";
import Icon from "./components/Icon.vue";
import Input from "./components/form/Input.vue"
import Separator from "./components/ui/Separator.vue";
import Switch from "./components/Switch.vue";
import SearchInput from "./components/form/SearchInput.vue";

export const UiKit = {
    install(app) {
        app.component("FButton", Button);
        app.component("FIcon", Icon);
        app.component("FInput", Input);
        app.component("FSeparator", Separator);
        app.component("FSwitch", Switch);
        app.component("FSearchInput", SearchInput);
    },
};

export { Button, Icon, Input, Separator, Switch, SearchInput };
