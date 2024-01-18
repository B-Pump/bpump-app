export const checkImageURL = (url) => {
    if (!url) {
        return false;
    } else {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
}