// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../styles/styles.css';

// interface DiaryEntry {
//     id: number;
//     text: string;
//     created_at: string;
//     updated_at?: string;
// }

// const EntryDetails: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const [entry, setEntry] = useState<DiaryEntry | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchEntry = async () => {
//             try {
//                 // Допустим, ваш API принимает id в маршруте и в query-параметре (пример: /diary/7/?diary_id=7)
//                 const response = await axios.get<DiaryEntry>(`http://localhost:8000/diary/${id}/?diary_id=${id}`);
//                 setEntry(response.data);
//             } catch (err) {
//                 console.error(err);
//                 setError('Ошибка при загрузке записи');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEntry();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="page-container">
//                 <p>Загрузка записи...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="page-container">
//                 <p>{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="page-container">
//             <button onClick={() => navigate(-1)} className="back-button">Назад</button>
//             {entry && (
//                 <>
//                     <h2>Запись №{entry.id}</h2>
//                     <div className="entry-header">
//                         <span className="entry-date">{new Date(entry.created_at).toLocaleDateString()}</span>
//                         <span className="entry-time">{new Date(entry.created_at).toLocaleTimeString()}</span>
//                     </div>
//                     {/* Полный текст записи */}
//                     <p className="entry-full-text">{entry.text}</p>
//                 </>
//             )}
//         </div>
//     );
// };

// export default EntryDetails;