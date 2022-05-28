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
    spreadsheet.getSheet();
}