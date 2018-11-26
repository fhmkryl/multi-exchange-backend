interface IDb {
}
declare class MongooseDb implements IDb {
    private mongoose;
    constructor(url: string);
    connect: (url: string) => void;
}
