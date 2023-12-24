import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	let height: number;
	let weight: number;

	if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
		return res.status(400).send({ error: "malformatted parameters" });

	height = Number(req.query.height);
	weight = Number(req.query.weight);

	const bmi = calculateBmi(height, weight);

	return res.json({ weight, height,bmi });
})

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});

