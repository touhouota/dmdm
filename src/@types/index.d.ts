declare namespace dmdm {
    type SheetTypeDict = {
        name: string;
        type: string;
    };

    type MobileLogItem = [
        Date,
        MailAddress,
        Status,
        ManageNumber,
        ManageTeam
    ]

    type MobileLogObject = {
        timestamp: Date,
        mailAddress: MailAddress,
        nextStatus: Status,
        manageNumber: ManageNumber,
        manageTeam: ManageTeam
    }

    type MobileStatus = {
        manageNumber: ManageNumber,
        manageUser: Name,
        deviceUser: Name,
        manageTeam: ManageTeam,
        lastCheckDate: Date,
        checkUser: Name,
        deviceName: string,
        mobileNumber: string,
        status: Status
    }

    type MailAddress = string;

    type Status = "借りる" | "返す";

    type ManageNumber = string;

    type ManageTeam = string;

    type Name = string;
}

export = dmdm;
export as namespace dmdm;