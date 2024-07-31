import lastEmployeeJoined from "../assets/lastEmployeeJoined.svg";
import lastEmployeeleft from "../assets/lastEmployeeleft.svg";
import lastSalaryPaid from "../assets/lastSalaryPaid.svg";
import totalStaff from "../assets/totalStaff.svg";

const generatePurchaseSummaryData = (apiData, isLoading) => {
    // Initialize counters
    let totalPurchaseCount = 0;
    let cancelledPurchaseCount = 0;
    let yearToTodayPurchaseCount = 0;
    let monthToDayPurchaseCount = 0;

    // Iterate through the API data to calculate totals
    apiData &&
        apiData.forEach((item) => {
            totalPurchaseCount += item.total_purchase_count || 0;
            cancelledPurchaseCount += item["cancelled purchase count"] || 0;
            yearToTodayPurchaseCount += item["year today purcahse count"] || 0;
            monthToDayPurchaseCount += item["month today purchase count"] || 0;
        });

    // Generate the purchase summary details in the desired format
    const purchaseSummaryDetails = [
        {
            img: totalStaff,
            mainTitle: totalPurchaseCount.toFixed(0),
            subTitle1: "Total Purchase",
            subTitle2: "",
            bgColor: "rgba(255, 226, 229, 1)",
            loading: isLoading,
        },
        {
            img: lastSalaryPaid,
            mainTitle: cancelledPurchaseCount.toFixed(0),
            subTitle1: "Cancelled",
            subTitle2: "",
            bgColor: "rgba(255, 244, 222, 1)",
            loading: isLoading,
        },
        {
            img: lastEmployeeJoined,
            mainTitle: yearToTodayPurchaseCount.toFixed(0),
            subTitle1: "Year to today",
            subTitle2: "",
            bgColor: "rgba(220, 252, 231, 1)",
            loading: isLoading,
        },
        {
            img: lastEmployeeleft,
            mainTitle: monthToDayPurchaseCount.toFixed(0),
            subTitle1: "Month to day",
            subTitle2: "",
            bgColor: "rgba(243, 232, 255, 1)",
            loading: isLoading,
        },
    ];

    return purchaseSummaryDetails;
};

export default generatePurchaseSummaryData;
