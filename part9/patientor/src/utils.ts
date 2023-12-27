import { NewPatientEntry } from './types';
import { Gender } from './types';

const isString = (text: unknown): text is string => {
	return (typeof text === 'string' || text instanceof String);
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(gender => gender.toString()).includes(param);
};

const parseString = (text: unknown): string => {
	if (!text || !isString(text))
		throw new Error('Incorrect or missing text.');
	return text;
};

const parseBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth))
		throw new Error('Incorrect or missing date: ' + dateOfBirth);
	return dateOfBirth;
};

const parseGender = (gender: unknown): string => {
	if (!gender || !isString(gender) || !isGender(gender))
		throw new Error('Incorrect or missing gender.');
	return gender;
};

const toNewPatient = (object: unknown): NewPatientEntry => {

	if (!object || typeof object !== 'object')
		throw new Error('Incorrect or missing data.');
	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)
	{
		const newEntry: NewPatientEntry = {
			name: parseString(object.name),
			dateOfBirth: parseBirth(object.dateOfBirth),
			ssn: parseString(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseString(object.occupation),
		};
		return newEntry;
	}
	throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;