import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "43270282-4a5d06b91258db09a976f913c";

async function serviceSearchPhoto(seachImage = "", page = 1, perPage = 15) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: seachImage,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: page,
                per_page: perPage
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Oops! Something went wrong. Please try again later.");
    }
}

export { serviceSearchPhoto };