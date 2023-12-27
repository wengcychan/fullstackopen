import patients from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, Patients } from '../types';
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

const addNewPatient = (entry: NewPatientEntry): Patients => {
	const id = uuid();
	const newPatient = {
		id,
		...entry
	};
	patients.push(newPatient);
	return newPatient;
};

export default { getNonSensitiveEntries, addNewPatient };