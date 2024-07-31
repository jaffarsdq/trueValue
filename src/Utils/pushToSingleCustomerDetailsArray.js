export default function pushToSingleCustomerDetailsArray(data, arrayKey, newObject) {
    // Create a deep copy of the data
    let newData = JSON.parse(JSON.stringify(data));

    // Check if the arrayKey exists and is an array
    if (newData[arrayKey] && Array.isArray(newData[arrayKey])) {
        // Push the new object into the array
        newData[arrayKey].push(newObject);
    } else {
        console.error(`The key ${arrayKey} is not a valid array.`);
    }

    // Return the updated data
    return newData;
}

// let updatedData = pushToSingleCustomerDetailsArray(singleCustomerDetails, 'BASICINFO', newBasicInfo);
