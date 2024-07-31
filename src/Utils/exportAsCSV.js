const exportAsCSV = (data, fileName) => {
    // Function to convert array of objects to CSV format
    const convertArrayOfObjectsToCSV = (array) => {
        let result;
        const columnDelimiter = ",";
        const lineDelimiter = "\n";
        const keys = Object.keys(array[0]);

        result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach((item) => {
            let ctr = 0;
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter;
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    };

    // Create a data URI and download the CSV file
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(data);
    if (csv == null) return;

    const filename = `${fileName} export.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
};

export default exportAsCSV;
