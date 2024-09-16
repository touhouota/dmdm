import { MobileLogItem } from "../@types";
import { Spreadsheet } from "./spreadsheet";

export class LogSheet extends Spreadsheet {
    constructor(sheet) {
        super();
        this.sheet = sheet;
    }

    getRequest(){
        let requestRow = this.sheet.getLastRow();
        let request = this.sheet.getRange(requestRow, 1, 1, 5).getValues()[0];
        return this.convertMobileLogObject(<MobileLogItem>request);
    }
}