export default class Note{
    id;
    title;
    content;
    creationTime;
    reminderTime;

    constructor(title, content, creationTime, reminderTime) {
        this.title = title;
        this.content = content;
        this.creationTime = creationTime;
        this.reminderTime = reminderTime;
    }
}