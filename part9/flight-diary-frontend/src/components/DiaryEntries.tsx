import { NonSensitiveDiaryEntry } from '../types';

const DiaryEntries = ({diaries}: {diaries: NonSensitiveDiaryEntry[]}) => (
  <div>
    <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
  </div>
);

export default DiaryEntries;