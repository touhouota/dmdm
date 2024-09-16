import { Spreadsheet } from "../src/spreadsheet";

it("test", () => {
    const url = "https://docs.google.com/spreadsheets/d/12tpUZ62HgnSvs3C2pLCXZlzv9tENAzTCEAixjmKc8Yo/edit#gid=0";
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
    const sheet = new Spreadsheet(url, sheetDict);
    expect(sheet).toBeInstanceOf(Spreadsheet);
})