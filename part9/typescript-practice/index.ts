import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

	if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
		return res.status(400).send({ error: "malformatted parameters" });

	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	const bmi = calculateBmi(height, weight);

	return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target)
		return res.status(400).send({ error: "parameters missing" });

	if (Array.isArray(daily_exercises))
	{
		if (!daily_exercises.every(exercise => !isNaN(Number(exercise))))
			return res.status(400).send({ error: "malformatted parameters" });
	}
	else
		return res.status(400).send({ error: "malformatted parameters" });

	if (isNaN(Number(target)))
		return res.status(400).send({ error: "malformatted parameters" });

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExercise(daily_exercises, target);
	return res.json(result);

});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

