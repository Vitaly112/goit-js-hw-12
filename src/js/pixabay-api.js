import axios from 'axios';

export async function serviceSearchPhoto(searchImage, page, perPage) {
    const API_KEY = "43270282-4a5d06b91258db09a976f913c";
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchImage,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page: perPage,
    });

    const BASE_URL = "https://pixabay.com/api/";

    try {
        const response = await axios.get(`${BASE_URL}?${params}`);
        return response.data;
        
    } catch (error) {
        alert(error.message);
    }
}