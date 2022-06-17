import { SheetFactory } from "./spreadsheet/sheetFactory";

global.main = () => {
    let url = "https://docs.google.com/spreadsheets/d/1zq0LtIzTm6OlUqQerE8yj8HUOKn1H3BY-FVl19D1-TA/edit#gid=0";
    let sheetDict = [
        {
            // Note: 端末情報のマスタデータがあるシート名を指定
            name: "mobile_list",
            type: "master"
        },
        {
            // Note: GoogleFormから送信されたデータが追加されるシートの名前を指定
            name: "log",
            type: "log"
        }
    ];
    let sheetFactory = new SheetFactory(url, sheetDict);
    let log = sheetFactory.getLogSheet();
    let request = log.getRequest();

    let master = sheetFactory.getMasterSheet();
    master.updateStatus(request);
}