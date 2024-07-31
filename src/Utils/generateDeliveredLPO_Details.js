function generateDeliveredLPO_Details(Data, isLoading) {
    const statusCounts = Data.reduce(
        (acc, location) => {
            acc.totalLPO += location.po_count || 0;
            acc.noOfItems += location.item_count || 0;
            acc.totalAmount += location.total_amt || 0;
            return acc;
        },
        {
            totalLPO: 0,
            noOfItems: 0,
            totalAmount: 0,
        }
    );

    const DeliveredLPO_Details = [
        {
            price: `${statusCounts.totalLPO.toFixed(0) || 0}`,
            title: "Total LPO",
            loading: isLoading,
        },
        {
            price: `${statusCounts.noOfItems.toFixed(0) || 0}`,
            title: "No of Items",
            loading: isLoading,
        },
        {
            price: `${statusCounts.totalAmount.toFixed(0) || 0}`,
            title: "Total Amount",
            loading: isLoading,
        },
    ];

    return DeliveredLPO_Details;
}

export default generateDeliveredLPO_Details;
