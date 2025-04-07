import React, { useEffect, useState } from 'react';
import './styles/styles.css'; // Если App.tsx находится в /src, это корректно
import { getEntries, createEntry, DiaryEntryAPI } from './services/api';
import ExpandableText from './components/ExpandableText';

// Интерфейс для отображаемой записи
interface DiaryEntry {
    id: number;
    date: string;  // формат: YYYY-MM-DD
    title: string;
    text: string;
}

const App: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(false);

    // Загрузка записей с API и преобразование их в формат для UI  
    const fetchEntries = async () => {
        setLoading(true);
        try {
            const apiEntries = await getEntries();
            // Предполагаем, что API возвращает поле text, где первая строка – заголовок,
            // а остальные – текст записи.
            const processed = apiEntries.map((apiEntry: DiaryEntryAPI) => {
                const lines = apiEntry.text.split('\n');
                const title = lines[0] || '';
                const text = lines.slice(1).join('\n');
                return {
                    id: apiEntry.id,
                    date: apiEntry.created_at.split('T')[0],
                    title,
                    text
                };
            });
            setEntries(processed);
        } catch (error) {
            console.error('Ошибка загрузки записей', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    // Статистика
    const totalEntries = entries.length;
    const totalWords = entries.reduce((sum, entry) => {
        const titleWords = entry.title.trim().split(/\s+/).filter(Boolean).length;
        const textWords = entry.text.trim().split(/\s+/).filter(Boolean).length;
        return sum + titleWords + textWords;
    }, 0);
    const daysWithEntries = new Set(entries.map(e => e.date)).size;

    // Группировка записей по дате
    const groupedEntries: Record<string, DiaryEntry[]> = entries.reduce((acc, entry) => {
        if (!acc[entry.date]) acc[entry.date] = [];
        acc[entry.date].push(entry);
        return acc;
    }, {} as Record<string, DiaryEntry[]>);

    // Функция для формирования заголовка группы: Сегодня, Вчера или дата (d.MM)
    const getGroupLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        if (date.toDateString() === today.toDateString()) return "Сегодня";
        if (date.toDateString() === yesterday.toDateString()) return "Вчера";
        return `${date.getDate()}.${date.getMonth() + 1}`;
    };

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    // Обработка отправки формы новой записи  
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const text = formData.get('text') as string;
        try {
            const newEntryAPI = await createEntry({ title, text });
            const lines = newEntryAPI.text.split('\n');
            const newEntry: DiaryEntry = {
                id: newEntryAPI.id,
                date: newEntryAPI.created_at.split('T')[0],
                title: lines[0] || '',
                text: lines.slice(1).join('\n')
            };
            setEntries(prev => [newEntry, ...prev]);
        } catch (error) {
            console.error('Ошибка создания записи', error);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="app-container">
            {/* Верхняя панель */}
            <header className="app-header">
                <div className="header-left">Дневник</div>
                <div className="header-right">
                    <button className="icon-button" onClick={() => alert("Поиск")}>🔍</button>
                    <button className="icon-button" onClick={() => alert("Опции")}>⋮</button>
                </div>
            </header>

            {/* Статистика */}
            <div className="stats-container">
                <div className="stat">
                    <div className="stat-number">{totalEntries}</div>
                    <div className="stat-label">Записей</div>
                </div>
                <div className="stat">
                    <div className="stat-number">{totalWords}</div>
                    <div className="stat-label">Слов</div>
                </div>
                <div className="stat">
                    <div className="stat-number">{daysWithEntries}</div>
                    <div className="stat-label">Дней</div>
                </div>
            </div>

            {/* Список записей, сгруппированных по дате */}
            <div className="entries-container">
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    Object.keys(groupedEntries)
                        .sort((a, b) => (a < b ? 1 : -1))
                        .map((groupDate: string) => (
                            <div key={groupDate} className="entry-group">
                                <h3 className="group-label">{getGroupLabel(groupDate)}</h3>
                                {groupedEntries[groupDate].map((entry: DiaryEntry) => (
                                    <div key={entry.id} className="entry-card">
                                        <div className="entry-card-title">{entry.title}</div>
                                        <ExpandableText text={entry.text} />
                                    </div>
                                ))}
                            </div>
                        ))
                )}
            </div>

            {/* Плавающая кнопка "+" */}
            <button className="fab" onClick={openForm}>+</button>

            {/* Модальное окно для добавления новой записи */}
            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-date">
                                {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'short' })}
                            </div>
                            <button className="done-button" onClick={closeForm}>Готово</button>
                        </div>
                        <form onSubmit={handleSubmitForm} className="entry-form">
                            <input type="text" name="title" placeholder="Заголовок" className="entry-title-input" required />
                            <textarea name="text" placeholder="Текст записи" className="entry-textarea-input" required></textarea>
                            <button type="submit" className="submit-form-button">Сохранить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;