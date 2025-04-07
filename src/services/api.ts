import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api.com/api';

export const submitEntry = async (entry: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/journal`, { text: entry });
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке записи', error);
        throw error;
    }
};