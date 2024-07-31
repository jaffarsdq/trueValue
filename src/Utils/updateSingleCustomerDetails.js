export default function updateSingleCustomerDetails(
    data,
    arrayKey,
    updateKey,
    newValue
) {
    // Create a deep copy of the data
    let newData = JSON.parse(JSON.stringify(data));

    // Check if the arrayKey exists and is an array
    if (newData[arrayKey] && Array.isArray(newData[arrayKey])) {
        // Get the first object in the specified array
        let obj = newData[arrayKey][0];

        // Update the value of the specified key
        if (obj) {
            obj[updateKey] = newValue;
        } else {
            console.error(`The array ${arrayKey} is empty.`);
        }
    } else {
        console.error(`The key ${arrayKey} is not a valid array.`);
    }

    // Return the updated data
    return newData;
}


// let updatedData1 = updateSingleCustomerDetails(singleCustomerDetails, 'BASICINFO', 'client_id', '456');