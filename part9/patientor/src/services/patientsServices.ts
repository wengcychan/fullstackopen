import patients from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
		{
			id,
			name,
			dateOfBirth,
			gender,
			occupation
		}));
};

const addNewPatient = (entry: NewPatientEntry): Patient => {
	const id = uuid();
	const newPatient = {
		id,
		entries: [],
		...entry
	};
	patients.push(newPatient);
	return newPatient;
};

const getPatientEntry = (id: string): Patient => {
	const patient = patients.find(patient => patient.id === id);
	if (!patient)
		throw new Error('Incorrect id');
	return patient;
};

export default { getNonSensitiveEntries, addNewPatient, getPatientEntry };