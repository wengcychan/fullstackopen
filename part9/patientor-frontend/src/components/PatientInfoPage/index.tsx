import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Patient, Gender, Diagnosis } from "../../types";

import patientService from "../../services/patients";
import Entries from "./Entries";

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

  return (
    <div>
      <h2>{patient.name} <span>{generateGenderIcon(patient.gender)}</span></h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <Entries patient={patient} diagnoses={diagnoses}/>
    </div>
  );
};

export default PatientInfoPage;