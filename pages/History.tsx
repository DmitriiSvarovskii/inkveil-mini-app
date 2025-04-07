// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../styles/styles.css';

// interface DiaryEntry {
//     id: number;
//     text: string;
//     created_at: string;
//     updated_at?: string;
// }

// const History: React.FC = () => {
//     const [entries, setEntries] = useState<DiaryEntry[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchEntries = async () => {
//             try {
//                 const response = await axios.get<DiaryEntry[]>('http://localhost:8000/diary/');
//                 setEntries(response.data);
//             } catch (err) {
//                 console.error(err);
//                 setError('Ошибка при загрузке записей');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEntries();
//     }, []);

//     const formatDateTime = (datetime: string) => {
//         const dateObj = new Date(datetime);
//         return {
//             date: dateObj.toLocaleDateString(),
//             time: dateObj.toLocaleTimeString()
//         };
//     };

//     if (loading) {
//         return (
//             <div className="page-container">
//                 <h1>История записей</h1>
//                 <p>Загрузка...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="page-container">
//                 <h1>История записей</h1>
//                 <p>{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="page-container">
//             <h1>История записей</h1>
//             {entries.length === 0 ? (
//                 <p>Записей не найдено</p>
//             ) : (
//                 <div className="entries-list">
//                     {entries.map((entry) => {
//                         const { date, time } = formatDateTime(entry.created_at);
//                         return (
//                             <div key={entry.id} className="entry">
//                                 <Link to={`/diary/${entry.id}`} className="entry-link">
//                                     <div className="entry-header">
//                                         <span className="entry-date">{date}</span>
//                                         <span className="entry-time">{time}</span>
//                                     </div>
//                                     <p className="entry-text">{entry.text}</p>
//                                 </Link>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default History;