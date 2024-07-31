import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useSelector } from "react-redux";
import ChartWithDownloadCRM from "../../Components/CRMComponents/ChartWithDownloadCRM";

Chart.register(ChartDataLabels);

const PointsEarnedVsRedeemedChart = () => {
    const {
        pointsEarnedVsRedeemedByMonth,
        loadingPointsEarnedVsRedeemedByMonth,
    } = useSelector((state) => state.crm);
    const hardcodedData = [
        { month: "January", earned: 100, redeemed: 80 },
        { month: "February", earned: 120, redeemed: 90 },
        { month: "March", earned: 150, redeemed: 110 },
        { month: "April", earned: 130, redeemed: 100 },
        { month: "May", earned: 160, redeemed: 120 },
        { month: "June", earned: 140, redeemed: 110 },
        { month: "July", earned: 170, redeemed: 130 },
        { month: "August", earned: 180, redeemed: 140 },
        { month: "September", earned: 190, redeemed: 150 },
        { month: "October", earned: 200, redeemed: 160 },
        { month: "November", earned: 210, redeemed: 170 },
        { month: "December", earned: 220, redeemed: 180 },
    ];
    let data = [
        {
            Month: "May",
            Earned: 2196,
            Redeemed: 219.557,
        },
        {
            Month: "June",
            Earned: 200,
            Redeemed: 20,
        },
    ];

    const labels = pointsEarnedVsRedeemedByMonth && pointsEarnedVsRedeemedByMonth?.map((data) => data?.Month);
    const earnedPoints = pointsEarnedVsRedeemedByMonth && pointsEarnedVsRedeemedByMonth?.map(
        (data) => data.Earned
    );
    const redeemedPoints = pointsEarnedVsRedeemedByMonth && pointsEarnedVsRedeemedByMonth?.map(
        (data) => data?.Redeemed
    );

    const barDataAcc = {
        labels,
        datasets: [
            {
                label: "Points Earned",
                backgroundColor: "rgba(27, 169, 234, 0.7)",
                borderColor: "rgba(27, 169, 234, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(27, 169, 234, 0.5)",
                hoverBorderColor: "rgba(27, 169, 234, 1)",
                data: earnedPoints,
            },
            {
                label: "Points Redeemed",
                backgroundColor: "rgba(0, 224, 150, 0.7)",
                borderColor: "rgba(0, 224, 150, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(0, 224, 150, 0.5)",
                hoverBorderColor: "rgba(0, 224, 150, 1)",
                data: redeemedPoints,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: false,
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                offset: false,
                grid: {
                    display: true,
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <ChartWithDownloadCRM
            data={earnedPoints}
            chartType="bar"
            chartData={barDataAcc}
            chartOptions={options}
            chartHeading="Points Earned vs Redeemed"
            isLoading={loadingPointsEarnedVsRedeemedByMonth} // Since we're using hardcoded data, loading state is false
        />
    );
};

export default PointsEarnedVsRedeemedChart;
