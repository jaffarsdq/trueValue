function generatePendingLPO_Details(Data, isLoading) {
    const statusCounts = Data.reduce(
        (acc, supplier) => {
            acc.approved += supplier["Un Approved Count"] || 0;
            acc.pending += supplier["Waiting for Delivery Count"] || 0;
            acc.delivered += supplier["Cancelled Count"] || 0; // Assuming this represents delivered count
            return acc;
        },
        {
            approved: 0,
            pending: 0,
            delivered: 0,
        }
    );

    const DeliveredLPO_Details = [
        {
            price: `${statusCounts.approved || 0}`,
            title: "Under Approval",
            loading: isLoading,
        },
        {
            price: `${statusCounts.pending || 0}`,
            title: "Waiting for Delivery",
            loading: isLoading,
        },
        {
            price: `${statusCounts.delivered || 0}`,
            title: "Cancelled/Rejected",
            loading: isLoading,
        },
    ];

    return DeliveredLPO_Details;
}

export default generatePendingLPO_Details;
