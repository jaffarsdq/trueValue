function calculateProfitAndPercentages(totalExpenses, totalRevenue) {
    const expensePercentage = (totalExpenses / totalRevenue) * 100;
    const revenuePercentage = (totalRevenue / totalExpenses) * 100;
    const overallProfitPercentage =
        ((totalRevenue - totalExpenses) / totalExpenses) * 100;

    return {
        expensePercentage: expensePercentage.toFixed(2),
        revenuePercentage: revenuePercentage.toFixed(2),
        overallProfitPercentage: overallProfitPercentage.toFixed(2),
    };
}

export default calculateProfitAndPercentages;
