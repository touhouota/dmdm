import { ManageNumber, MobileLogItem, MobileLogObject, SheetTypeDict } from "../@types/index";

export class Spreadsheet {
    sheetURL: string;
    sheet: GoogleAppsScript.Spreadsheet.Sheet;
    rows: any[][];
    rowItem = { // ここのIndexはArrayの場合
        manageNumber: 0,
        manageUser: 2,
        deviceUser: 3,
        manageTeam: 4,
        lastCheckDate: 6,
        checkUser: 7,
        deviceName: 10,
        phoneNumber: 12,
        status: 22
    }

    getInfoByManageNumber(manageNumber: ManageNumber) {
        let row = this.getRows().find(row => row[0] === manageNumber);
        return this.convertMobileStatus(row);
    }

    updateStatus(userRequest: MobileLogObject){
        console.log(userRequest);

        let changeRowIndex = this.getRows().findIndex(row => row[0] === userRequest.manageNumber);
        if(userRequest.nextStatus === "借りる") {
            console.log("借りる");

            this.setSellData(changeRowIndex + 1, this.rowItem.status + 1, "貸出中");
            this.setSellData(changeRowIndex + 1, this.rowItem.manageTeam + 1, userRequest.manageTeam);
        } else {
            this.setSellData(changeRowIndex + 1, this.rowItem.status + 1, "在庫");
            this.setSellData(changeRowIndex + 1, this.rowItem.manageTeam + 1, "情シス");
        }
        this.setSellData(changeRowIndex + 1, this.rowItem.lastCheckDate + 1, new Date());
    }

    protected convertMobileLogObject(mobileLogItem: MobileLogItem): MobileLogObject {
        console.log("comvertMobileLogObject", mobileLogItem);

        let keys = [
            "timestamp", "mailAddress", "nextStatus", "manageNumber", "manageTeam"
        ]

        return <MobileLogObject>Object.fromEntries(
            keys.map((key, index) => [key, mobileLogItem[index]])
        );
    }

    protected convertMobileStatus(mobileStatusRow) {
        return Object.fromEntries(
            Object.entries(this.rowItem).map(([key, index]) => [key, mobileStatusRow[index]])
        );
    }

    // NOTE: indexはSpreadsheetのインデックス
    protected setSellData(rowIndex, columnIndex, data) {
        this.sheet.getRange(rowIndex, columnIndex).setValue(data);
    }

    protected getRows() {
        if(!this.rows) this.rows = this.sheet.getDataRange().getValues();

        return this.rows;
    }
}