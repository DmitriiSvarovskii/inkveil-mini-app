import React, { useState, useEffect } from 'react';

// Расширяем глобальные типы для Telegram Web Apps
declare global {
    interface TelegramMainButton {
        setParams: (params: { text: string }) => void;
        show: () => void;
    }

    interface TelegramWebApp {
        MainButton: TelegramMainButton;
        initDataUnsafe: any;
    }

    interface TelegramObj {
        WebApp: TelegramWebApp;
    }

    interface Window {
        Telegram?: TelegramObj;
    }
}

const DiaryEntryForm: React.FC = () => {
    const [entry, setEntry] = useState('');

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.MainButton.setParams({ text: 'Сохранить запись' });
            tg.MainButton.show();
        } else {
            console.log('Telegram WebApp не найден. Запущено в режиме разработки.');
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Отправка записи:', entry);
        // Здесь можно добавить вызов API для отправки записи на backend
        setEntry('');
    };

    return (
        <div className="diary-container">
            <h1>Как прошёл твой день?</h1>
            <form onSubmit={handleSubmit} className="diary-form">
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Напиши, как прошёл твой день..."
                    rows={6}
                    className="diary-textarea"
                />
                <button type="submit" className="submit-button">
                    Отправить
                </button>
            </form>
            {/* Если Telegram WebApp недоступен, выводим fallback */}
            {(!window.Telegram || !window.Telegram.WebApp) && (
                <div className="fallback-info">
                    <p>Telegram WebApp не найден. Вы работаете в режиме разработки.</p>
                    <button
                        onClick={() => console.log('Нажата кастомная кнопка "Сохранить"')}
                        className="submit-button"
                    >
                        Кастомная кнопка "Сохранить"
                    </button>
                </div>
            )}
        </div>
    );
};

export default DiaryEntryForm;