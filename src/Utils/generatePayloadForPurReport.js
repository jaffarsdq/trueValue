const generatePayloadForPurReport = (selectedReport, filters) => {
    const commonData = {
        DIV_DES: "",
        DIV_ID: "1",
        FUNCTION: "ErpDB_Pur_Get_Report_Purchase_by_Id",
        SEND_KEY: "123456",
        DATA: {
            Id: selectedReport.Id,
            Name: selectedReport.Name,
        },
    };

    // Check if filters array is empty
    if (filters.length === 0) {
        switch (selectedReport.Id) {
            case "pur-001":
                commonData.DATA.loc_id = "001";
                commonData.DATA.from_date = "2022-01-01";
                commonData.DATA.to_date = "2024-02-19";
                commonData.DATA.supp_from = "00003";
                commonData.DATA.supp_to = "0045";
                break;
            case "pur-002":
                commonData.DATA.loc_id = "001";
                commonData.DATA.from_date = "2022-01-01";
                commonData.DATA.to_date = "2024-02-19";
                break;
            case "pur-003":
                commonData.DATA.loc_id = "001";
                commonData.DATA.from_date = "2022-01-01";
                commonData.DATA.to_date = "2024-02-19";
                break;
            case "pur-004":
                commonData.DATA.loc_id = "001";
                commonData.DATA.from_date = "2022-01-01";
                commonData.DATA.to_date = "2024-02-19";
                break;
            case "pur-005":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "pur-006":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                commonData.DATA.supp_from = "";
                commonData.DATA.supp_to = "";
                break;
            case "pur-007":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                commonData.DATA.supp_from = "";
                commonData.DATA.supp_to = "";
                break;
            default:
                break;
        }
    } else {
        // Iterate through filters and update commonData accordingly
        filters.forEach((filter) => {
            switch (filter.field) {
                case "loc_id":
                    commonData.DATA.loc_id = filter.value;
                    break;
                case "from_date":
                    commonData.DATA.from_date = filter.value;
                    break;
                case "to_date":
                    commonData.DATA.to_date = filter.value;
                    break;
                case "supp_from":
                    commonData.DATA.supp_from = filter.value;
                    break;
                case "supp_to":
                    commonData.DATA.supp_to = filter.value;
                    break;
                default:
                    break;
            }
        });
    }

    return commonData;
};

export default generatePayloadForPurReport;
