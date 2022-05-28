import { SheetTypeDict } from "./@types/index";
import { InvalidTypeDictError } from "./CustomError/invalidTypeDictError";


export class Spreadsheet{
    sheetURL: string;
    sheetTypeDicts: SheetTypeDict[];
    constructor(sheetURL: string, sheetTypeDicts?: SheetTypeDict[]) {
        this.sheetURL = sheetURL;
        this.sheetTypeDicts = sheetTypeDicts;
    }

    validateDict(dict: SheetTypeDict): boolean {
        console.log("validateDict", dict);

        if (!dict) { return false }
        return (!!dict.name) && (!!dict.type);
    }

    getSheetTypeDict(searchType: string): SheetTypeDict {
        return this.sheetTypeDicts.find(sheetTypeDict => {
            return sheetTypeDict.type === searchType;
        });
    }

    getSheet() {
        let sheet = SpreadsheetApp.openByUrl(this.sheetURL);
        let sheetTypeDict = this.getSheetTypeDict("master");
        if (!this.validateDict(sheetTypeDict)) {
            throw new InvalidTypeDictError("SheetTypeDict unexpected value.", sheetTypeDict);
        }

        console.log("ここまで来たよ");


        sheet.getSheets().forEach(sheet => console.log(sheet.getSheetName()));
    }
}