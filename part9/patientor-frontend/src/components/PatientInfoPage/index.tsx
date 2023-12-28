import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Patient, Gender, Diagnosis } from "../../types";

import patientService from "../../services/patients";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientInfoPage = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
  
  const [patient, setPatient] = useState<Patient | null>(null);

  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id)
        return <p>Invalid id</p>;  
      const patient = await patientService.getPatient(id);
      if (patient)
        setPatient(patient);
    };
    void fetchPatient();

  }, [id]);

  if (!patient)
    return <p>Invalid id</p>;

  const generateGenderIcon = (gender: Gender) => {
    if (gender === Gender.Male)
      return <MaleIcon/>;
    else if (gender === Gender.Female)
      return <FemaleIcon/>;
    else
      return <TransgenderIcon/>;
  };
  
  const generateCodeDescription = (code: string) : string | null => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    if (!diagnosis)
      return null;
    return diagnosis.name;
  };

  return (
    <div>
      <h2>{patient.name} <span>{generateGenderIcon(patient.gender)}</span></h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {
        patient.entries.map(entry => {
          const {id, date, description, diagnosisCodes} = entry;
          return (
            <div key={id}>
              <p>{date} <i>{description}</i></p>
              <ul>
                { diagnosisCodes && diagnosisCodes.map(code => <li key={code}>{code} {generateCodeDescription(code)} </li>) }
              </ul>
            </div>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;