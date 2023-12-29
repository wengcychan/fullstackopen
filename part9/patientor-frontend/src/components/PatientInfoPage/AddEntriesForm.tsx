import { Container, TextField, Alert, Button } from '@mui/material';
import { useState, SyntheticEvent } from "react";
import patientService from "../../services/patients";
import axios from 'axios';
import { Patient } from "../../types";

interface Props {
	patient: Patient;
	setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
	setShowAddEntriesForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEntriesForm = ({patient, setPatient, setShowAddEntriesForm} : Props) => {

	const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');
	const [error, setError] = useState<string>();

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();
		try {
      const entry = await patientService.createEntry({
				description,
				date,
				specialist,
				healthCheckRating: parseInt(healthCheckRating, 10),
				diagnosisCodes: diagnosisCodes.split(','),
				type: "HealthCheck"
			}, patient.id);
			setPatient({...patient, entries: patient.entries.concat(entry)});
			setDescription('');
			setDate('');
			setSpecialist('');
			setHealthCheckRating('');
			setDiagnosisCodes('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
			setTimeout(() => {
				setError('');
			}, 3000);
    }
	};
	return (
		<Container style={{ padding: '1.5em', border: '1px dotted #000', borderRadius: '0.2em', marginBottom: '4em' }}>
			<h3>New HealthCheck Entry</h3>
			{error && <Alert severity="error">{error}</Alert>}
			<form onSubmit={addEntry}>
				<TextField
					label="Description"
					fullWidth
					variant="standard"
					sx={{ marginBottom: 2 }}
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<TextField
					label="Date"
					fullWidth
					variant="standard"
					sx={{ marginBottom: 2 }}
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Specialist"
					fullWidth
					variant="standard"
					sx={{ marginBottom: 2 }}
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<TextField
					label="Healthcheck rating"
					fullWidth
					variant="standard"
					sx={{ marginBottom: 2 }}
					value={healthCheckRating}
					onChange={({ target }) => setHealthCheckRating(target.value)}
				/>
				<TextField
					label="Diagnosis codes"
					fullWidth
					variant="standard"
					sx={{ marginBottom: 2 }}
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>
				<Button
					style={{
						float: 'right',
					}}
					type="submit"
					variant="contained"
				>
					Add
				</Button>
				<Button
					variant="contained"
					onClick={() => setShowAddEntriesForm(false)}
				>
					Cancel
				</Button>
			</form>
		</Container>
	);
};

export default AddEntriesForm;