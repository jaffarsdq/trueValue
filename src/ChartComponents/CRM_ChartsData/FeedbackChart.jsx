import ChartWithDownloadCRM from "../../Components/CRMComponents/ChartWithDownloadCRM";

const FeedbackChart = () => {
    const Data = [
        {
            Date: "2024-06-20T07:02:19.823",
            Rating_id: "2",
            Question: "How good was the service?",
            Rating: "It was the worst",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:02:19.823",
            Rating_id: "3",
            Question: "How was the staff?",
            Rating: "It was the worst",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:04:51.357",
            Rating_id: "2",
            Question: "How good was the service?",
            Rating: "It was bad\r\n",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:04:51.357",
            Rating_id: "3",
            Question: "How was the staff?",
            Rating: "It was good\r\n",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:24:22.343",
            Rating_id: "2",
            Question: "How good was the service?",
            Rating: "It was the worst",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:24:22.343",
            Rating_id: "5",
            Question: "Rate the pizza 123",
            Rating: "It was the best",
            Rating_type: "Simley",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:33:03.457",
            Rating_id: "2",
            Question: "How good was the service?",
            Rating: "It was the worst",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
        {
            Date: "2024-06-20T07:34:01.710",
            Rating_id: "2",
            Question: "How good was the service?",
            Rating: "It was the worst",
            Rating_type: "Star",
            Count_options_id: 1,
            Overall_Score: 1,
            Grand_Total: 1,
        },
    ];

    const loadingData = false;

    // Aggregating data by rating
    const ratingCounts = Data.reduce((acc, curr) => {
        const rating = curr.Rating.trim();
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(ratingCounts);
    const data = Object.values(ratingCounts);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Number of Ratings",
                data: data,
                borderColor: "rgba(60, 216, 86, 1)",
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
                display: false,
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
            data={Data}
            chartType="line"
            chartData={chartData}
            chartOptions={options}
            chartHeading="Feeback Analysis"
            isLoading={loadingData}
        />
    );
};

export default FeedbackChart;
