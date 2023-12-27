import diagnoses from '../../data/diagnoses';
import { Diagnoses } from '../types';

const getAll = (): Diagnoses[] => {
	return diagnoses;
};

export default { getAll };