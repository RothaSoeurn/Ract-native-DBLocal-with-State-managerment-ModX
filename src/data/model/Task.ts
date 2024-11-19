import { Realm } from "@realm/react";

class Task extends Realm.Object {
    _id!: string;
    description!: string;
    isCompleted!: boolean;
    createdAt!: Date;

    static schema = {
        name: "Task",
        primaryKey: "_id",
        properties: {
            _id: "string",
            description: "string",
            isCompleted: { type: 'bool', default: false },
            createdAt: "date",
        }
    }

}

export default Task;