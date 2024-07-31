export default function DisplayDateFormat(dateString) {
    // Create a new Date object from the given date string
    // const dateString = "2024-07-01T00:00:00"
    if (!dateString) return;
    const date = new Date(dateString);
 
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
 
    // Extract the time part
    const timePart = formattedDate.split(",")[1].trim();
 
    // Construct the final formatted date string
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")} at ${timePart}`;
}
 
// // Example usage
// const formattedDateTime = displayFormattedDate('2022-09-09T12:07:25.867');
// console.log(formattedDateTime);