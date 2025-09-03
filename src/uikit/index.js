import "./style/index.css";

import FButton from "./components/buttons/FButton.vue";
import FHorizontalSelect from "./components/buttons/FHorizontalSelect.vue";
import FSwitch from "./components/FSwitch.vue";
import FActionsButton from "./components/buttons/FActionsButton.vue";

import FIcon from "./components/FIcon.vue";
import FSeparator from "./components/ui/FSeparator.vue";
import FResizableSplit from "./components/ui/FResizableSplit.vue";
import FCard from "./components/ui/FCard.vue";
import FFilterParamsContainer from "./components/ui/filter/FFilterParamsContainer.vue";
import FFilterParamsItem from "./components/ui/filter/FFilterParamsItem.vue";

import FFormContainer from "./components/form/FFormContainer.vue";
import FInput from "./components/form/FInput.vue"
import FSearchInput from "./components/form/FSearchInput.vue";

import FTitle from "./components/ui/FTitle.vue";

import FTable from "./components/tables/FTable.vue";
import FConfirmDialog from "./components/modals/FConfirmDialog.vue";
import FTextArea from "./components/form/FTextArea.vue";
import FSelect from "./components/form/FSelect.vue";
import FFileInputItem from "@uikit/components/form/FFileInputItem.vue";
import FFileInput from "@uikit/components/form/FFileInput.vue";
import FTextEditor from "@uikit/components/FTextEditor.vue";
import FContainer from "@uikit/components/ui/FContainer.vue";
import FColorPicker from "@uikit/components/ui/FColorPicker.vue";

export const UiKit = {
    install(app) {
        app.component("FButton", FButton);
        app.component("FHorizontalSelect", FHorizontalSelect);
        app.component("FSwitch", FSwitch);
        app.component("FActionsButton", FActionsButton);
        app.component("FContainer", FContainer);

        app.component("FIcon", FIcon);
        app.component("FSeparator", FSeparator);
        app.component("FResizableSplit", FResizableSplit);
        app.component("FCard", FCard);
        app.component("FFilterParamsContainer", FFilterParamsContainer);
        app.component("FFilterParamsItem", FFilterParamsItem);

        app.component("FFormContainer", FFormContainer);
        app.component("FInput", FInput);
        app.component("FSearchInput", FSearchInput);
        app.component("FTextArea", FTextArea);
        app.component("FSelect", FSelect);
        app.component("FFileInputItem", FFileInputItem);
        app.component("FFileInput", FFileInput);

        app.component("FTitle", FTitle);

        app.component("FTable", FTable);

        app.component("FConfirmDialog", FConfirmDialog);

        app.component("FTextEditor", FTextEditor);
        app.component("FColorPicker", FColorPicker);
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
    FResizableSplit,
    FCard,
    FFilterParamsContainer,
    FFilterParamsItem,
    FTable,
    FActionsButton,
    FConfirmDialog,
    FTextArea,
    FSelect,
    FTextEditor,
    FFileInputItem,
    FFileInput,
    FContainer,
    FColorPicker
};
