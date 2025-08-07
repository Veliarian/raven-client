import "./style/index.css";

import FButton from "./components/buttons/FButton.vue";
import FHorizontalSelect from "./components/buttons/FHorizontalSelect.vue";
import FIcon from "./components/FIcon.vue";
import FInput from "./components/form/FInput.vue"
import FSeparator from "./components/ui/FSeparator.vue";
import FSwitch from "./components/FSwitch.vue";
import FSearchInput from "./components/form/FSearchInput.vue";
import FTitle from "./components/ui/FTitle.vue";

export const UiKit = {
    install(app) {
        app.component("FButton", FButton);
        app.component("FHorizontalSelect", FHorizontalSelect);
        app.component("FIcon", FIcon);
        app.component("FInput", FInput);
        app.component("FSeparator", FSeparator);
        app.component("FSwitch", FSwitch);
        app.component("FSearchInput", FSearchInput);
        app.component("FTitle", FTitle);
    },
};

export { FButton, FHorizontalSelect, FIcon, FInput, FSeparator, FSwitch, FSearchInput, FTitle };
