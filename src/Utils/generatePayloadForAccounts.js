const generatePayloadForAccounts = (selectedFunction, filters) => {
    const commonData = {
        DIV_DES: "",
        DIV_ID: "1",
        FUNCTION: selectedFunction,
        SEND_KEY: "123456",
        DATA: {},
    };

    // Check if filters array is empty
    if (filters.length === 0) {
        switch (selectedFunction) {
            case "ErpDB_PDCAccList":
                commonData.DATA.div_no = "01";
                commonData.DATA.from_date = "2022-10-19";
                commonData.DATA.to_date = "2024-01-23";
                break;
            case "ErpDB_MonthwiseExpense":
                commonData.DATA.from_date = "2022-01-01";
                commonData.DATA.to_date = "2024-01-31";
                commonData.DATA.dept_no = "001";
                break;
            case "ErpDB_MonthWiseRevenue":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_date = "2022-01-01";
                commonData.DATA.to_date = "2024-01-31";
                break;
            case "ErpDB_GetInvoiceCollection":
                commonData.DATA.dept_no = "001";
                commonData.DATA.from_date = "2022-04-01";
                commonData.DATA.to_date = "2024-01-30";
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
                case "dept_no":
                    commonData.DATA.dept_no = filter.value;
                    break;
                case "from_date":
                    commonData.DATA.from_date = filter.value;
                    break;
                case "to_date":
                    commonData.DATA.to_date = filter.value;
                    break;
                // Add more cases as needed for other fields
                default:
                    // Handle unknown filter fields if needed
                    break;
            }
        });
    }

    return commonData;
};

export default generatePayloadForAccounts;
