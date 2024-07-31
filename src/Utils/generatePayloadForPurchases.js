//generatePayloadForPurchases.js

const generatePayloadForPurchases = (selectedFunction, filters) => {
    const commonData = {
        DIV_DES: "",
        DIV_ID: "1",
        FUNCTION: selectedFunction,
        SEND_KEY: "123456",
        DATA: {},
    };
    // const currentDate = new Date().toISOString().split("T")[0];

    // Check if filters array is empty
    if (filters.length === 0) {
        switch (selectedFunction) {
            case "ErpDB_GetSupplierWisePurchase":
                commonData.DATA.loc_id = "";
                commonData.DATA.supp_from = "";
                commonData.DATA.supp_to = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "ErpDB_GetLocationWisePurchase":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "ErpDB_Pur_DeliveredLPO":
                commonData.DATA.loc_id = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "ErpDB_pur_pending_LPO":
                commonData.DATA.loc_id = "";
                commonData.DATA.supp_from = "";
                commonData.DATA.supp_to = "";
                commonData.DATA.from_date = "";
                commonData.DATA.to_date = "";
                break;
            case "ErpDB_Pur_PurchaseSummary":
                commonData.DATA.loc_id = "";
                commonData.DATA.supp_from = "";
                commonData.DATA.supp_to = "";
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
                case "loc_id":
                    commonData.DATA.loc_id = filter.value;
                    break;
                case "from_date":
                    commonData.DATA.date_from = filter.value;
                    commonData.DATA.from_date = filter.value;

                    break;
                case "to_date":
                    commonData.DATA.date_to = filter.value;
                    commonData.DATA.to_date = filter.value;
                    break;
                case "supp_from":
                    commonData.DATA.supp_from = filter.value;
                    break;
                case "supp_to":
                    commonData.DATA.supp_to = filter.value;
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

export default generatePayloadForPurchases;
