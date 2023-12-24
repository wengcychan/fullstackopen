interface BmiInfo {
	height: number;
	weight: number;
}

const parseBmiArguments = (args: string[]): BmiInfo => {
	if (args.length > 4) throw new Error('Too many arguments');
	if (args.length < 4) throw new Error('Not enough arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		}
	else
		throw new Error('Provided values were not numbers!');
}

export const calculateBmi = (height: number, weight: number): string => {
	const bmi: number = weight / ((height / 100) ** 2);
	if (bmi < 16.0)
		return 'Underweight (Severe thinness)';
	else if (bmi >= 16.0 && bmi <= 16.9)
		return 'Underweight (Severe thinness)';
	else if (bmi >= 17.0 && bmi <= 18.4)
		return 'Underweight (Mild thinness)';
	else if (bmi >= 18.5 && bmi <= 24.9)
		return 'Normal (healthy weight)';
	else if (bmi >= 25.0 && bmi <= 29.9)
		return 'Overweight (Pre-obese)';
	else if (bmi >= 30.0 && bmi <= 34.9)
		return 'Obese (Class I)';
	else if (bmi >= 35.0 && bmi <= 39.9)
		return 'Obese (Class II)';
	else
		return 'Obese (Class III)';
}

try {
	const { height, weight } = parseBmiArguments(process.argv);
	console.log(calculateBmi(height, weight));
}
catch (error: unknown) {
	let errorMessgae = 'Something bad happened.';
	if (error instanceof Error)
		errorMessgae += ' Error: ' + error.message;
	console.log(errorMessgae);
}

