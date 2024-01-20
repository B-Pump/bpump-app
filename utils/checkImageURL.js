/**
 * Checks if the provided URL points to an image with certain formats
 * @param {string} url - The URL of the image to check
 * @returns {boolean} - Returns true if the URL is a valid image, otherwise false
 */
export const checkImageURL = (url) => {
    if (!url) {
        return false
    } else {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
    }
}
