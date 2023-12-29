import { useState, useEffect } from 'react';
import diaryService from './services/diaryService';
import Form from './components/Form';
import DiaryEntries from './components/DiaryEntries';
import { NonSensitiveDiaryEntry } from './types';

const App = () => {

  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessgae] = useState('');

  useEffect(() => {
    diaryService
    .getAllDiaries()
    .then(diaries => setDiaries(diaries))
  }, []);

  return (
    <div>
      <h1>Add new entry</h1>
      {errorMessage && <p style={{ color: 'red' }}><b>{errorMessage}</b></p>}
      <Form diaries={diaries} setDiaries={setDiaries} setErrorMessage={setErrorMessgae}/>
      <DiaryEntries diaries={diaries} />
    </div>
  )
}

export default App
