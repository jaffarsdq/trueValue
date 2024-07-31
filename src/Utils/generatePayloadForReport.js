const generatePayloadForReport = (selectedReport, filters) => {
    const commonData = {
        DIV_DES: "",
        DIV_ID: "1",
        FUNCTION: "ErpDB_GetInventoryReportById",
        SEND_KEY: "123456",
        DATA: {
            Id: selectedReport.Id,
            Name: selectedReport.Name,
        },
    };

    // Check if filters array is empty
    if (filters.length === 0) {
        switch (selectedReport.Id) {
            case "inv-001":
                commonData.DATA.company_code = "";
                commonData.DATA.asdate = "";
                break;
            case "inv-002":
                commonData.DATA.loc_id = "";
                commonData.DATA.asdate = "";
                break;
            case "inv-003":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "inv-004":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            default:
                break;
        }
    } else {
        // Iterate through filters and update commonData accordingly
        filters.forEach((filter) => {
            switch (filter.field) {
                case "company_code":
                    commonData.DATA.company_code = filter.value;
                    break;
                case "asdate":
                    commonData.DATA.asdate = filter.value;
                    break;
                case "loc_id":
                    commonData.DATA.loc_id = filter.value;
                    break;
                case "from_date":
                    commonData.DATA.from_date = filter.value;
                    break;
                case "to_date":
                    commonData.DATA.to_date = filter.value;
                    break;
                // Add more cases as needed for other fields
                default:
                    break;
            }
        });
    }

    return commonData;
};

export default generatePayloadForReport;
