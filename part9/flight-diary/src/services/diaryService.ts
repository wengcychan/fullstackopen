import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = () => {
	return axios
		.get<NonSensitiveDiaryEntry[]>(baseUrl)
		.then(response => response.data);
}

const createDiary = (newDiary: NewDiaryEntry) => {
	return axios
		.post<NonSensitiveDiaryEntry>(baseUrl, newDiary)
		.then(response => response.data);
}

export default { getAllDiaries, createDiary };