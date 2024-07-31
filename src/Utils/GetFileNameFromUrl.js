export default function getFileNameFromUrl(url) {
    // Check if url is defined
    if (!url) {
        return null; // Or handle this case according to your application's logic
    }

    // Split the URL by '/' and get the last element
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
}
