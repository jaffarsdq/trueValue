function formatNumber(number, decimal) {
    if(number != 0) if (!number) return;
    const formattedNumber = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimal || 0,
        maximumFractionDigits: decimal || 0,
    }).format(number);

    return formattedNumber;
}

export default formatNumber;
