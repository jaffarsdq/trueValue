const generatePayloadForAccReport = (selectedReport, filters) => {
    const commonData = {
        DIV_DES: "",
        DIV_ID: "1",
        FUNCTION: "ErpDB_Acc_Report_ParameterList_By_Id",
        SEND_KEY: "123456",
        DATA: {
            Id: selectedReport.Id,
            Name: selectedReport.Name,
        },
    };

    // Check if filters array is empty
    if (filters.length === 0) {
        switch (selectedReport.Id) {
            case "Acc-001":
                commonData.DATA.from_date = "2022-01-31";
                commonData.DATA.to_date = "2024-01-31";
                break;
            case "Acc-002":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_date = "2024-01-01";
                commonData.DATA.to_date = "2024-12-31";
                break;
            case "Acc-003":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_year = "2022";
                commonData.DATA.to_year = "2024";
                break;
            case "Acc-004":
                commonData.DATA.from_year = "2022";
                commonData.DATA.to_year = "2024";
                break;
            case "Acc-005":
                commonData.DATA.from_date = "2022-01-31";
                commonData.DATA.to_date = "2024-01-31";
                break;
            case "Acc-006":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_date = "2022-01-31";
                commonData.DATA.to_date = "2024-01-31";
                break;
            case "Acc-007":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_year = "2022";
                commonData.DATA.to_year = "2024";
                break;
            case "Acc-008":
                commonData.DATA.from_year = "2022";
                commonData.DATA.to_year = "2024";
                break;
            case "Acc-009":
                commonData.DATA.div_no = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "Acc-010":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_date = "2022-01-31";
                commonData.DATA.to_date = "2024-01-31";
                break;
            default:
                break;
        }
    } else {
        // Iterate through filters and update commonData accordingly
        filters.forEach((filter) => {
            switch (filter.field) {
                case "div_no":
                    commonData.DATA.div_no = filter.value;
                    break;
                case "from_date":
                    commonData.DATA.from_date = filter.value;
                    break;
                case "to_date":
                    commonData.DATA.to_date = filter.value;
                    break;
                case "dept_no":
                    commonData.DATA.dept_no = filter.value;
                    // Add more cases as needed for other fields
                    break;
                case "from_year":
                    commonData.DATA.from_year = filter.value;
                    break;
                case "to_year":
                    commonData.DATA.to_year = filter.value;
                    break;
                default:
                    break;
            }
        });
    }

    return commonData;
};

export default generatePayloadForAccReport;
