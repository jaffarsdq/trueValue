//generatePayloadForCrm.js

const generatePayloadForCrm = (filters) => {
    const commonData = {
        DATA: {},
    };
    // Iterate through filters and update commonData
    filters.forEach((filter) => {
        commonData.DATA[filter.field] = filter.value;
    });

    return commonData;
};

export default generatePayloadForCrm;
