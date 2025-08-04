export default class Note{
    id;
    title;
    content;
    creationTime;
    reminderTime;

    constructor(id, title, content, creationTime, reminderTime) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creationTime = creationTime;
        this.reminderTime = reminderTime;
    }

    static fromObject(obj) {
        return new Note(obj.id, obj.title, obj.content, obj.creationTime, obj.reminderTime);
    }
}