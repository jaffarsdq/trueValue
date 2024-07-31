function generateReqChartData(purchaseData) {
    const statusCounts =
        purchaseData && typeof purchaseData === "string"
            ? false
            : true &&
              purchaseData.length > 0 &&
              purchaseData.reduce(
                  (acc, supplier) => {
                      acc.approved += supplier["Approved Count"] || 0;
                      acc.pending += supplier["Pending Count"] || 0;
                      acc.partial += supplier["Partial Count"] || 0;
                      acc.delivered += supplier["Delivery Count"] || 0;
                      acc.unapproved += supplier["Un Approved Count"] || 0;
                      return acc;
                  },
                  {
                      approved: 0,
                      pending: 0,
                      partial: 0,
                      delivered: 0,
                      unapproved: 0,
                  }
              );

    const ReqChartData = [
        { price: `${statusCounts.approved || 0}`, title: "Approved" },
        { price: `${statusCounts.pending || 0}`, title: "Pending" },
        { price: `${statusCounts.delivered || 0}`, title: "Delivered" },
        { price: `${statusCounts.partial || 0}`, title: "Partial" },
        { price: `${statusCounts.unapproved || 0}`, title: "Unapproved" },
    ];

    return ReqChartData;
}

export default generateReqChartData;
