interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface CalculatorInput {
	target: number;
	exercises: number[];
}

const parseExArguments = (args: string[]): CalculatorInput => {
	if (args.length < 4) throw new Error('Not enough arguments');

	let target: number = 0;
	const exercises: number[] = [];

	for (let i = 2; i < args.length; ++i)
	{
		if (isNaN(Number(args[i])))
			throw new Error('Provided values were not numbers!');
		if (i === 2)
			target = Number(args[i]);
		else
			exercises.push(Number(args[i]));
	}

	return {
		target,
		exercises
	};
};

export const calculateExercise = (exercises: number[], target: number): Result => {

	const average: number = exercises.reduce((total, exercise) => total += exercise, 0) / exercises.length;
	let rating: number;
	let ratingDescription: string;

	if (average / target < 0.8)
	{
		rating = 1;
		ratingDescription = 'not enough exercises';
	}

	else if (average / target > 1.2)
	{
		rating = 3;
		ratingDescription = 'good progress';
	}
	else
	{
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	}
	
	return {
		periodLength: exercises.length,
		trainingDays: exercises.filter(exercise => exercise !== 0).length,
		success: average < target ? false : true,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const{ target, exercises } = parseExArguments(process.argv);
	console.log(calculateExercise(exercises, target));
}
catch (error: unknown) {
	let errorMessgae = 'Something bad happened.';
	if (error instanceof Error)
		errorMessgae += ' Error: ' + error.message;
	console.log(errorMessgae);
}