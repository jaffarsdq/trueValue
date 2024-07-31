export default function sortReportFilters(reportFilters) {
    const fieldOrder = [
        "loc_id",
        "dept_no",
        "div_no",
        "dept_code",
        "company_code",
        "from_loc_id",
        "to_loc_id",
        "from_month",
        "to_month",
        "from_year",
        "to_year",
        "from_date",
        "to_date",
        "as_of_data",
        "branch_from",
        "branch_to",
        "date_of_join_from",
        "date_of_join_to",
        "aging_period_1",
        "aging_period_2",
        "aging_period_3",
        "employee_from",
        "employee_to",
        "supp_from",
        "supp_to",
        "cust_from",
        "cust_to",
        "record",
        "age_limit",
        "A",
        "B",
        "C",
        "1",
        "2",
        "3",
    ]; // Define the desired order of fields

    const customSort = (a, b) => {
        const indexA = fieldOrder.indexOf(
            a.field.toLowerCase() || a.field_name.toLowerCase()
        );
        const indexB = fieldOrder.indexOf(
            b.field.toLowerCase() || b.field_name.toLowerCase()
        );

        if (indexA === -1) return 1; // Move items not found in fieldOrder to the end
        if (indexB === -1) return -1; // Move items not found in fieldOrder to the end

        return indexA - indexB; // Sort based on index position in fieldOrder
    };

    return (
        (reportFilters.length && reportFilters.slice().sort(customSort)) || []
    );
}

// const reportFilters = [
//     {
//         "field": "loc_id",
//         "value": "001",
//         "mandatory": "true"
//     },
//     {
//         "field": "record",
//         "value": "100",
//         "mandatory": "false"
//     },
//     {
//         "field": "to_date",
//         "value": "2024-03-14",
//         "mandatory": "true"
//     },
//     {
//         "field": "from_date",
//         "value": "2022-03-09",
//         "mandatory": true
//     }
// ];

// const sortedFilters = sortReportFilters(reportFilters);

// console.log(sortedFilters);
