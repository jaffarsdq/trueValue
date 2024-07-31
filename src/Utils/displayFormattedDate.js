export default function displayFormattedDate(dateString) {
    // Check if the dateString is empty or null
    if (!dateString) return;

    // Special case for "Total values"
    if (dateString === "Total values") return "Total Values";

    // Split the input string by comma to handle multiple dates
    const dateStrings = dateString.split(",");

    // Format each date string individually
    const formattedDates = dateStrings.map((ds) => {
        const date = new Date(ds.trim());

        // Options for formatting the date and time
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // Use 12-hour clock format
        };

        // Format the date and time using toLocaleString()
        const formattedDate = date.toLocaleString("en-US", options);

        // Split the formatted date to get date and time parts
        const splitDate = formattedDate.split(",");

        // Check if the split operation resulted in at least two parts
        const timePart = splitDate.length > 1 ? splitDate[1].trim() : "";

        // Construct the final formatted date string
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")} at ${timePart}`;
    });

    // Return the formatted dates joined by comma if there are multiple dates
    return formattedDates.join(", ");
}

// Example usage
// const formattedDateTime = displayFormattedDate('2022-09-09T12:07:25.867');
// const formattedDateTimeMultiple = displayFormattedDate('2023-04-01T00:00:00, 2023-04-01T00:00:00');
// console.log(formattedDateTime);
// console.log(formattedDateTimeMultiple);
