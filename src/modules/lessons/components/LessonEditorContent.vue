<script setup>
import { ref } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { FontFamily } from '@tiptap/extension-font-family'
import { FontSize } from '@tiptap/extension-font-size'
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'

import { FButton, FSelect, FColorPicker } from '@uikit';
import {mdiFormatListBulleted, mdiFormatListNumbered, mdiImage, mdiLink} from '@mdi/js';

const content = ref('');

const fonts = [
    { id: 'Arial', label: 'Arial' },
    { id: 'Times New Roman', label: 'Times New Roman' },
    { id: 'Verdana', label: 'Verdana' },
    { id: 'Courier New', label: 'Courier New' },
    { id: 'Georgia', label: 'Georgia' },
];

const fontSizes = [
    { id: '12px', label: '12px' },
    { id: '14px', label: '14px' },
    { id: '16px', label: '16px' },
    { id: '18px', label: '18px' },
    { id: '24px', label: '24px' },
    { id: '32px', label: '32px' },
    { id: '48px', label: '48px' },
];

const textColor = ref('#000000');
const bgColor = ref('#ffffff');
const fontFamily = ref('Arial');
const fontSize = ref('16px');

const editor = useEditor({
    extensions: [
        StarterKit,
        TextStyle,
        Color,
        FontFamily.configure({ types: ['textStyle'] }),
        FontSize.configure({ types: ['textStyle'] }),
        BulletList,
        OrderedList,
        ListItem,
        Link.configure({ openOnClick: true }),
        Image
    ],
    content: '',
    onUpdate({ editor }) {
        content.value = editor.getHTML();
    },
});

// ==== ACTIONS ====
function toggleBold() { editor.chain().focus().toggleBold().run(); }
function toggleItalic() { editor.chain().focus().toggleItalic().run(); }
function toggleUnderline() { editor.chain().focus().toggleUnderline().run(); }
function toggleStrike() { editor.chain().focus().toggleStrike().run(); }
function setFontFamily(font) { fontFamily.value = font; editor.chain().focus().setFontFamily(font).run(); }
function setFontSize(size) { fontSize.value = size; editor.chain().focus().setFontSize(size).run(); }
function setTextColor(color) { textColor.value = color; editor.chain().focus().setColor(color).run(); }
function setBgColor(color) { bgColor.value = color; editor.chain().focus().setHighlight({ color }).run(); }
function insertLink(url) { if(url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run(); }
function insertImage(url) { if(url) editor.chain().focus().setImage({ src: url }).run(); }

</script>

<template>
    <div class="lesson-editor">
        <div class="toolbar">
            <f-select v-model="fontFamily" :options="fonts" placeholder="Font" @update:modelValue="setFontFamily"/>
            <f-select v-model="fontSize" :options="fontSizes" placeholder="Size" @update:modelValue="setFontSize"/>

            <f-button type="light" @click="toggleBold"><b>B</b></f-button>
            <f-button type="light" @click="toggleItalic"><i>I</i></f-button>
            <f-button type="light" @click="toggleUnderline"><u>U</u></f-button>
            <f-button type="light" @click="toggleStrike"><s>S</s></f-button>

            <f-button type="light" :icon="mdiFormatListBulleted" @click="editor.chain().focus().toggleBulletList().run()"/>
            <f-button type="light" :icon="mdiFormatListNumbered" @click="editor.chain().focus().toggleOrderedList().run()"/>

            <f-button type="light" :icon="mdiLink" @click="() => insertLink(prompt('Enter URL'))"/>
            <f-button type="light" :icon="mdiImage" @click="() => insertImage(prompt('Image URL'))"/>

            <f-colorPicker v-model="textColor" @update:modelValue="setTextColor"/>
            <f-colorPicker v-model="bgColor" @update:modelValue="setBgColor"/>
        </div>

        <EditorContent class="editor-area" :editor="editor"/>
    </div>
</template>

<style scoped>
.lesson-editor {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
}

.editor-area {
    flex: 1;
    background: var(--surface);
}
</style>