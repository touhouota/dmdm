import { SheetTypeDict } from "../@types/index";

export class InvalidTypeDictError extends Error {
    message: string;
    sheetTypeDict: SheetTypeDict;
    name: string = "InvalidTypeDictError";
    constructor(message: string, SheetTypeDict?: SheetTypeDict) {
        super();
        this.message = this.createMessage(message);
        this.sheetTypeDict = SheetTypeDict;
    }

    createMessage(message): string {
        return `${this.name}: ${message}; Object: ${this.sheetTypeDict}`;
    }
}