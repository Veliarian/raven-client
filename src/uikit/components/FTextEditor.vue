<script setup>
import { ref, reactive, onMounted } from "vue";
import { FButton, FSelect, FColorPicker } from "@uikit";
import { mdiImage, mdiLink, mdiTable } from "@mdi/js";

const content = ref("");
const editorRef = ref(null);

const toolbar = reactive({
    fontSize: "16px",
    fontFamily: "Arial",
});

const textColor = ref("#000000");
const bgColor = ref("#ffffff");

const fonts = [
    { id: "Arial", label: "Arial" },
    { id: "Times New Roman", label: "Times New Roman" },
    { id: "Verdana", label: "Verdana" },
    { id: "Courier New", label: "Courier New" },
    { id: "Georgia", label: "Georgia" }
];

const fontSizes = [
    { id: "12px", label: "12px" },
    { id: "14px", label: "14px" },
    { id: "16px", label: "16px" },
    { id: "18px", label: "18px" },
    { id: "24px", label: "24px" },
    { id: "32px", label: "32px" },
    { id: "48px", label: "48px" }
];

// ==== UTILS ====
function applyStyleToSelection(styleObj = {}, toggle = false) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const fragment = range.extractContents();
    const wrapper = document.createElement("span");

    if (toggle) {
        let allHave = true;
        fragment.childNodes.forEach(node => {
            if (node.nodeType === 3) return;
            for (const key in styleObj) {
                if (node.style?.[key] !== styleObj[key]) allHave = false;
            }
        });

        if (allHave) {
            fragment.childNodes.forEach(node => {
                if (node.nodeType === 3) return;
                for (const key in styleObj) node.style[key] = "";
            });
            range.insertNode(fragment);
            selection.removeAllRanges();
            selection.addRange(range);
            return;
        }
    }

    Object.assign(wrapper.style, styleObj);
    wrapper.appendChild(fragment);
    range.insertNode(wrapper);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartBefore(wrapper);
    newRange.setEndAfter(wrapper);
    selection.addRange(newRange);
}

// ==== ACTIONS ====
function toggleBold() { applyStyleToSelection({ fontWeight: "bold" }, true); }
function toggleItalic() { applyStyleToSelection({ fontStyle: "italic" }, true); }
function toggleUnderline() { applyStyleToSelection({ textDecoration: "underline" }, true); }
function toggleStrike() { applyStyleToSelection({ textDecoration: "line-through" }, true); }

function setFont(font) { toolbar.fontFamily = font; applyStyleToSelection({ fontFamily: font }); }
function setFontSize(size) { toolbar.fontSize = size; applyStyleToSelection({ fontSize: size }); }
function setTextColor(color) { textColor.value = color; applyStyleToSelection({ color }); }
function setBgColor(color) { bgColor.value = color; applyStyleToSelection({ backgroundColor: color }); }

// ==== Insert ====
function insertLink(url) {
    if (!url) return;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const wrapper = document.createElement("a");
    wrapper.href = url;
    wrapper.style.color = "#0077cc";
    wrapper.style.textDecoration = "underline";

    const fragment = range.extractContents();
    wrapper.appendChild(fragment);
    range.insertNode(wrapper);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartBefore(wrapper);
    newRange.setEndAfter(wrapper);
    selection.addRange(newRange);
}

function insertImage(url) {
    if (!url) return;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const img = document.createElement("img");
    img.src = url;
    img.style.maxWidth = "100%";
    img.style.display = "block";
    img.style.margin = "8px 0";
    range.insertNode(img);
}

function insertTable(rows = 2, cols = 2) {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    for (let r = 0; r < rows; r++) {
        const tr = document.createElement("tr");
        for (let c = 0; c < cols; c++) {
            const td = document.createElement("td");
            td.textContent = "\u00A0";
            td.style.border = "1px solid #ddd";
            td.style.padding = "4px";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.getRangeAt(0).insertNode(table);
}

// ==== SYNC CONTENT ====
onMounted(() => {
    editorRef.value.addEventListener("input", () => {
        content.value = editorRef.value.innerHTML;
    });
});
</script>

<template>
    <div class="lesson-editor">
        <!-- Toolbar -->
        <div class="toolbar">
            <f-select v-model="toolbar.fontFamily" :options="fonts" placeholder="Font" @update:modelValue="setFont"/>
            <f-select v-model="toolbar.fontSize" :options="fontSizes" placeholder="Size" @update:modelValue="setFontSize"/>

            <f-button type="light" @click="toggleBold"><b>B</b></f-button>
            <f-button type="light" @click="toggleItalic"><i>I</i></f-button>
            <f-button type="light" @click="toggleUnderline"><u>U</u></f-button>
            <f-button type="light" @click="toggleStrike"><s>S</s></f-button>

            <f-button type="light" :icon="mdiTable" @click="() => insertTable()"/>
            <f-button type="light" :icon="mdiLink" @click="() => insertLink(prompt('Enter URL'))"/>
            <f-button type="light" :icon="mdiImage" @click="() => insertImage(prompt('Image URL'))"/>

            <f-color-picker v-model="textColor" label="Text color" @update:modelValue="setTextColor"/>
            <f-color-picker v-model="bgColor" label="Highlight color" @update:modelValue="setBgColor"/>
        </div>

        <!-- Editable Content -->
        <div ref="editorRef" class="editor-area" contenteditable="true"></div>
    </div>
</template>

<style scoped>
.lesson-editor {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.editor-area {
    min-height: 400px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: var(--spacing-s-m);
    overflow-y: auto;
}
</style>