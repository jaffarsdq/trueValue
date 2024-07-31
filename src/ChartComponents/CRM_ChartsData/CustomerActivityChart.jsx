import ChartWithDownloadCRM from "../../Components/CRMComponents/ChartWithDownloadCRM";

const CustomerActivityChart = () => {
    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
        ],
        datasets: [
            {
                label: "Normal",
                data: [130, 250, 300, 200, 100, 90, 330, 250, 222, 150],
                borderColor: "rgba(167, 0, 255, 1)",
                backgroundColor: "rgba(167, 0, 255, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(167, 0, 255, 1)",
                cubicInterpolationMode: "monotone",
            },
            {
                label: "Loyalty",
                data: [50, 150, 200, 120, 80, 70, 250, 180, 150, 100],
                borderColor: "rgba(239, 68, 68, 1)",
                backgroundColor: "rgba(239, 68, 68, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(239, 68, 68, 1)",
                cubicInterpolationMode: "monotone",
            },
            {
                label: "Credit",
                data: [200, 100, 50, 300, 180, 120, 250, 150, 200, 100],
                borderColor: "rgba(60, 216, 86, 1)",
                backgroundColor: "rgba(60, 216, 86, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(60, 216, 86, 1)",
                cubicInterpolationMode: "monotone",
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: false,
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    color: ["#7B91B0"],
                    boxWidth: 12,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#7B91B0",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: "#7B91B0",
                },
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
            chartType="line"
            chartData={data}
            chartOptions={options}
            chartHeading="Customer Activity"
            data={data.datasets[0].data} // Updated to hardcoded data
            isLoading={false} // No loading state for hardcoded data
        />
    );
};

export default CustomerActivityChart;
