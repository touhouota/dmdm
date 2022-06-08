import { Spreadsheet } from "./spreadsheet";

global.test = () => {
    let url = "https://docs.google.com/spreadsheets/d/1zq0LtIzTm6OlUqQerE8yj8HUOKn1H3BY-FVl19D1-TA/edit#gid=0";
    let sheetDict = [
        {
            name: "mobile_list",
            type: "master"
        },
        {
            name: "log",
            type: "log"
        }
    ]
    let spreadsheet = new Spreadsheet(url, sheetDict);
    let log = spreadsheet.getSheetByType("log");
    let request = log.getRequest();

    let master = spreadsheet.getSheetByType("master");
    let status = master.getStatusByManageNumber(request[3]);
    master.updateStatus(request[2], request[3]);

}