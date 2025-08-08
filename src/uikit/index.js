import "./style/index.css";

import FButton from "./components/buttons/FButton.vue";
import FHorizontalSelect from "./components/buttons/FHorizontalSelect.vue";
import FSwitch from "./components/FSwitch.vue";

import FIcon from "./components/FIcon.vue";
import FSeparator from "./components/ui/FSeparator.vue";
import FResizableSplit from "./components/ui/FResizableSplit.vue";

import FFormContainer from "./components/form/FFormContainer.vue";
import FInput from "./components/form/FInput.vue"
import FSearchInput from "./components/form/FSearchInput.vue";

import FTitle from "./components/ui/FTitle.vue";

export const UiKit = {
    install(app) {
        app.component("FButton", FButton);
        app.component("FHorizontalSelect", FHorizontalSelect);
        app.component("FSwitch", FSwitch);

        app.component("FIcon", FIcon);
        app.component("FSeparator", FSeparator);
        app.component("FResizableSplit", FResizableSplit);

        app.component("FFormContainer", FFormContainer);
        app.component("FInput", FInput);
        app.component("FSearchInput", FSearchInput);

        app.component("FTitle", FTitle);
    },
};

export {
    FButton,
    FHorizontalSelect,
    FIcon,
    FInput,
    FSeparator,
    FSwitch,
    FSearchInput,
    FTitle,
    FFormContainer,
    FResizableSplit
};
