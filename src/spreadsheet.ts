import { SheetTypeDict } from "./@types/index";
import { InvalidTypeDictError } from "./CustomError/invalidTypeDictError";


export class Spreadsheet {
    sheetURL: string;
    sheetTypeDicts: SheetTypeDict[];
    sheet: GoogleAppsScript.Spreadsheet.Sheet;
    rows: any[][];
    constructor(sheetURL: string, sheetTypeDicts?: SheetTypeDict[]) {
        this.sheetURL = sheetURL;
        this.sheetTypeDicts = sheetTypeDicts;
    }

    getSheetByType(sheetType: string) {
        let sheet = SpreadsheetApp.openByUrl(this.sheetURL);
        let sheetTypeDict = this.getSheetTypeDict(sheetType);
        if (!this.validateDict(sheetTypeDict)) {
            throw new InvalidTypeDictError("SheetTypeDict unexpected value.", sheetTypeDict);
        }

        this.sheet = sheet.getSheets().find(sheet => sheet.getSheetName() === sheetTypeDict.name);
        return this;
    }

    getStatusByManageNumber(manageNumber: string) {
        console.log(manageNumber);

        return this.getRows().find(row => row[0] === manageNumber);
    }

    getRequest(){
        let requestRow = this.sheet.getLastRow();
        return this.sheet.getRange(requestRow, 1, 1, 4).getValues()[0];
    }

    updateStatus(userRequest, manageNumber){
        let nextStatus;
        if(userRequest === "借りる") {
            nextStatus = "貸出中";
        } else {
            nextStatus = "在庫";
        }
        console.log("nextStatus:", nextStatus);


        let changeRowIndex = this.getRows().findIndex(row => row[0] === manageNumber);
        this.sheet.getRange(changeRowIndex + 1, 23).setValue(nextStatus);
    }

    private validateDict(dict: SheetTypeDict): boolean {
        console.log("validateDict", dict);

        if (!dict) { return false }
        return (!!dict.name) && (!!dict.type);
    }

    private getSheetTypeDict(searchType: string): SheetTypeDict {
        return this.sheetTypeDicts.find(sheetTypeDict => {
            return sheetTypeDict.type === searchType;
        });
    }

    private getRows() {
        if(!this.rows) this.rows = this.sheet.getDataRange().getValues();

        return this.rows;
    }
}