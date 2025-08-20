export class EntityIdentifier {
    id: string;
    name: string;

    constructor(data: Partial<EntityIdentifier>) {
        Object.assign(this, data);
    }
}
