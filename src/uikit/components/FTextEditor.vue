<script setup>
import {ref, reactive, onMounted} from "vue";
import {FButton, FColorPicker, FSelect} from "@uikit";
import {mdiImage, mdiLink, mdiTable} from "@mdi/js";

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

// ==== Selection / Range API ====
function applyStyle(tag = "span", styles = {}) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const el = document.createElement(tag);
    Object.assign(el.style, styles);

    const extracted = range.extractContents();
    el.appendChild(extracted);
    range.insertNode(el);

    range.setStartAfter(el);
    range.setEndAfter(el);
    selection.removeAllRanges();
    selection.addRange(range);
}

function toggleBold() { applyStyle("span", { fontWeight: "bold" }); }
function toggleItalic() { applyStyle("span", { fontStyle: "italic" }); }
function toggleUnderline() { applyStyle("span", { textDecoration: "underline" }); }
function toggleStrike() { applyStyle("span", { textDecoration: "line-through" }); }

function insertLink(url) {
    if (!url) return;
    applyStyle("a", { color: "#0077cc", textDecoration: "underline" });
    const selection = window.getSelection();
    const anchor = selection.anchorNode?.parentElement;
    if (anchor?.tagName === "A") {
        anchor.href = url;
    }
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

function setFont(font) { toolbar.fontFamily = font; applyStyle("span", { fontFamily: font }); }
function setFontSize(size) { toolbar.fontSize = size; applyStyle("span", { fontSize: size }); }

function setTextColor(color) { textColor.value = color; applyStyle("span", { color }); }
function setBgColor(color) { bgColor.value = color; applyStyle("span", { backgroundColor: color }); }

// Синхронізація
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
            <f-select
                v-model="toolbar.fontFamily"
                :options="fonts"
                placeholder="Font"
                @update:modelValue="setFont"
            />
            <f-select
                v-model="toolbar.fontSize"
                :options="fontSizes"
                placeholder="Size"
                @update:modelValue="setFontSize"
            />

            <f-button type="light" @click="toggleBold"><b>B</b></f-button>
            <f-button type="light" @click="toggleItalic"><i>I</i></f-button>
            <f-button type="light" @click="toggleUnderline"><u>U</u></f-button>
            <f-button type="light" @click="toggleStrike"><s>S</s></f-button>

            <f-button type="light" :icon="mdiTable" @click="() => insertTable()"/>
            <f-button type="light" :icon="mdiLink" @click="() => insertLink(prompt('Enter URL'))"/>
            <f-button type="light" :icon="mdiImage" @click="() => insertImage(prompt('Image URL'))"/>

            <!-- Кастомні ColorPicker -->
            <f-color-picker
                v-model="textColor"
                label="Text color"
                @update:modelValue="setTextColor"
            />
            <f-color-picker
                v-model="bgColor"
                label="Highlight color"
                @update:modelValue="setBgColor"
            />
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
    font-family: v-bind('toolbar.fontFamily');
    font-size: v-bind('toolbar.fontSize');
}
</style>