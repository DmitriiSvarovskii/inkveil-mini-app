import axios from 'axios';

// Укажите корректный URL вашего backend сервера
const API_BASE_URL = 'https://7e9b-2a04-5201-1-00-dc.ngrok-free.app';

// Интерфейс, соответствующий записи, возвращаемой API
export interface DiaryEntryAPI {
    id: number;
    text: string; // API возвращает текст, где первая строка — это заголовок
    created_at: string;
    updated_at?: string | null;
}

export const getEntries = async (): Promise<DiaryEntryAPI[]> => {
    const response = await axios.get(`${API_BASE_URL}/diary/`, {
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });
    console.log('response.data:', response.data);
    return response.data;
};
// Функция для получения списка записей
// export const getEntries = async (): Promise<DiaryEntryAPI[]> => {
//     console.log('Загружаю:', `${API_BASE_URL}/diary/`);
//     try {
//         const response = await axios.get<DiaryEntryAPI[]>(`${API_BASE_URL}/diary/`);
//         console.log('response.data:', response.data); 
//         return response.data;
//     } catch (error) {
//         console.error('Ошибка получения записей', error);
//         throw error;
//     }
// };

// Функция для создания новой записи
// Передаем объект с полями title и text; объединяем их через перенос строки.
export const createEntry = async (entry: { title: string; text: string }): Promise<DiaryEntryAPI> => {
    try {
        const payload = {
            text: `${entry.title}\n${entry.text}`
        };
        const response = await axios.post<DiaryEntryAPI>(`${API_BASE_URL}/diary/`, payload);
        return response.data;
    } catch (error) {
        console.error('Ошибка создания записи', error);
        throw error;
    }
};