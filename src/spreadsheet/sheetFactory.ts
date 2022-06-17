import { SheetTypeDict } from "../@types";
import { LogSheet } from "./logSheet";
import { MasterSheet } from "./masterSheet";

export class SheetFactory {
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
    sheets: GoogleAppsScript.Spreadsheet.Sheet[]
    sheetURL: string;
    sheetTypeDicts: SheetTypeDict[];
    constructor(sheetURL: string, sheetTypeDicts: SheetTypeDict[]) {
        this.sheetURL = sheetURL;
        this.sheetTypeDicts = sheetTypeDicts;
        this.spreadsheet = SpreadsheetApp.openByUrl(this.sheetURL);
    }

    getMasterSheet() {
        const masterType = this.getSheetTypeDict("master");
        const sheet = this.getSheet(masterType);
        return new MasterSheet(sheet);
    }

    getLogSheet() {
        const logType = this.getSheetTypeDict("log");
        const sheet = this.getSheet(logType);
        return new LogSheet(sheet);
    }

    protected getSheet(sheetType) {
        const sheet = this.getSheets().find(sheet => sheet.getSheetName() === sheetType.name)

        if(!sheet) {
            throw new Error(`Sheet Not Found: name=>${sheetType.name}`);
        }

        return sheet;
    }

    protected getSheets() {
        if (!this.sheets) {
            this.sheets = this.spreadsheet.getSheets();
        }

        return this.sheets;
    }

    protected getSheetTypeDict(searchType: string): SheetTypeDict {
        const targetTypeDict = this.sheetTypeDicts.find(sheetTypeDict => {
            return sheetTypeDict.type === searchType;
        });

        if(!targetTypeDict) {
            throw new Error(`sheetType Not Found: type => ${searchType}`);
        }

        return targetTypeDict;
    }

    protected validateDict(dict: SheetTypeDict): boolean {
        if (!dict) { return false }
        return (!!dict.name) && (!!dict.type);
    }
}