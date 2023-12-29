import { useState } from 'react';
import { NonSensitiveDiaryEntry, Weather, Visibility } from '../types';
import diaryService from '../services/diaryService'
import axios from 'axios';

const Form = ({ diaries, setDiaries, setErrorMessage }: {
  diaries: NonSensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {

  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    diaryService
      .createDiary({ date, weather, visibility, comment })
      .then(newDiary => {
        setDiaries(diaries.concat(newDiary));
        setDate('');
        setVisibility(Visibility.Great);
        setWeather(Weather.Sunny);
        setComment('');
      })
      .catch(error => {
        if (axios.isAxiosError(error))
        {
          if (error.response)
          {
            setErrorMessage(error.response.data);
            setTimeout(() => setErrorMessage(''), 5000);
          }
        }
      });
  };

  return (
    <form onSubmit={addDiary}>
      <div>
        date
        <input
          type="date"
          value={date}
          min="2023-01-01"
          max="2030-01-01"
          onChange={({target}) => setDate(target.value)}/>
      </div>

      <div>
        <span>visibility </span>
        <span>
          {Visibility.Great} <input type="radio" checked={visibility === Visibility.Great} name="visibility" onChange={() => setVisibility(Visibility.Great)}/>
          {Visibility.Good} <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Good)}/>
          {Visibility.Ok} <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Ok)}/>
          {Visibility.Poor} <input type="radio" name="visibility" onChange={() => setVisibility(Visibility.Poor)}/>
        </span>
      </div>

      <div>
      <span>weather </span>
        <span>
          {Weather.Sunny} <input type="radio" checked={weather === Weather.Sunny} name="weather" onChange={() => setWeather(Weather.Sunny)}/>
          {Weather.Rainy} <input type="radio" name="weather" onChange={() => setWeather(Weather.Rainy)}/>
          {Weather.Cloudy} <input type="radio" name="weather" onChange={() => setWeather(Weather.Cloudy)}/>
          {Weather.Stormy} <input type="radio" name="weather" onChange={() => setWeather(Weather.Stormy)}/>
          {Weather.Windy} <input type="radio" name="weather" onChange={() => setWeather(Weather.Windy)}/>
        </span>
      </div>

      <div>
        comment
        <input 
          value={comment}
          onChange={({target}) => setComment(target.value)}/>
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;