const generatePayloadForReport = (filters) => {
    const commonData = {
        DATA: {},
    };

    // Iterate through filters and update commonData accordingly
    filters.forEach((filter) => {
        commonData.DATA[filter.field] = filter.value;
    });

    return commonData;
};

export default generatePayloadForReport;
