import { useSelector } from "react-redux";
import ChartWithDownloadCRM from "../../Components/CRMComponents/ChartWithDownloadCRM";

const CustomerVisitsByMonth = () => {
    const { customerVisitsByMonth, loadingCustomerVisitsByMonth } = useSelector(
        (state) => state.crm
    );

    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const data = customerVisitsByMonth?.[0]
        ? [
              customerVisitsByMonth[0].jan,
              customerVisitsByMonth[0].feb,
              customerVisitsByMonth[0].mar,
              customerVisitsByMonth[0].apr,
              customerVisitsByMonth[0].may,
              customerVisitsByMonth[0].jun,
              customerVisitsByMonth[0].jul,
              customerVisitsByMonth[0].aug,
              customerVisitsByMonth[0].sep,
              customerVisitsByMonth[0].oct,
              customerVisitsByMonth[0].nov,
              customerVisitsByMonth[0].dec,
          ]
        : [];

    const chartData = {
        labels,
        datasets: [
            {
                label: "Customer Visits",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
                hoverBorderColor: "rgba(75, 192, 192, 1)",
                data,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                color: "#05004E",
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: true,
                    color: "#7B91B0",
                },
            },
            y: {
                offset: false,
                grid: {
                    display: true,
                },
                ticks: {
                    display: true,
                    color: "#7B91B0",
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        elements: {
            area: {
                backgroundColor: "white",
            },
        },
    };

    return (
        <ChartWithDownloadCRM
            data={data} 
            chartType="bar"
            chartData={chartData}
            chartOptions={options}
            chartHeading="Customer Visits by Month"
            isLoading={loadingCustomerVisitsByMonth}
        />
    );
};

export default CustomerVisitsByMonth;
