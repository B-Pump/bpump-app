/**
 * Vérifie si l'URL fournie pointe vers une image avec certains formats
 * @param {string} url - L'URL de l'image à vérifier
 * @returns {boolean} - Retourne true si l'URL est une image valide, sinon false
 */
export const checkImageURL = (url) => {
    if (!url) {
        return false;
    } else {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
}