// Function to format filters for Typography
const formatFiltersForTypography = (filters) => {
    const companyCodeFilter = filters.find(
        (filter) => filter.field === "company_code"
    );
    const asDateFilter = filters.find((filter) => filter.field === "asdate");
    const locIdFilter = filters.find((filter) => filter.field === "loc_id");
    const fromDateFilter = filters.find(
        (filter) => filter.field === "from_date"
    );
    const toDateFilter = filters.find((filter) => filter.field === "to_date");
    const divNoFilter = filters.find((filter) => filter.field === "div_no");
    const deptNoFilter = filters.find((filter) => filter.field === "dept_no");
    const suppFromFilter = filters.find(
        (filter) => filter.field === "supp_from"
    );
    const suppToFilter = filters.find((filter) => filter.field === "supp_to");

    let formattedFilters = [];

    if (companyCodeFilter)
        formattedFilters.push(`Company Code - ${companyCodeFilter.value}`);
    if (asDateFilter)
        formattedFilters.push(
            `As Date - ${new Date(asDateFilter.value).toLocaleDateString(
                "en-GB"
            )}`
        );
    if (locIdFilter)
        formattedFilters.push(`Location ID - ${locIdFilter.value}`);
    if (fromDateFilter)
        formattedFilters.push(
            `From - ${new Date(fromDateFilter.value).toLocaleDateString(
                "en-GB"
            )}`
        );
    if (toDateFilter)
        formattedFilters.push(
            `To - ${new Date(toDateFilter.value).toLocaleDateString("en-GB")}`
        );
    if (divNoFilter) formattedFilters.push(`Div No - ${divNoFilter.value}`);
    if (deptNoFilter) formattedFilters.push(`Dep No - ${deptNoFilter.value}`);
    if (suppFromFilter)
        formattedFilters.push(`Supplier From - ${suppFromFilter.value}`);
    if (suppToFilter)
        formattedFilters.push(`Supplier To - ${suppToFilter.value}`);

    return `( ${formattedFilters.join(" · ")} )`;
};

export default formatFiltersForTypography;
