import * as React from 'react'
import { SendButton } from '../components/NextButton'
import EndScreen from '@/components/EndScreen'
import QuestionScreen from '@/components/QuestionScreen'

const firstRace = 'https://ik.imagekit.io/i7lh9dcka/F1/tr:w-400/1950.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675082886754'
const maxVerstappen = 'https://ik.imagekit.io/i7lh9dcka/F1/tr:w-400/max.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675083426060'
const champions = 'https://ik.imagekit.io/i7lh9dcka/F1/tr:w-400/Lewis-and-Michael.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675084274601'

export const questionList = [
	{
		id: 0,
		title: 'Which year the first F1 race was held?',
		variants: ['1929', '1945', '1960', '1950'],
		correct: 3,
		picture: firstRace
	},
	{
		id: 1,
		title: 'Who is the current (march 2023) F1 Champion?',
		variants: ['Lewis Hamilton', 'Max Verstappen', 'Fernando Alonso'],
		correct: 1,
		picture: maxVerstappen
	},
	{
		id: 2,
		title: 'How many F1 drivers managed to become a world champoin for 7 times?',
		variants: ['0', '1', '2'],
		correct: 2,
		picture: champions
	},
	{
		id: 3,
		title: 'Choose the most titled F1 team',
		variants: ['Mercedes', 'Ferrari', 'Red bull', 'McLaren'],
		correct: 1,
		picture: ''
	},
]

async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	})
}


export default function App() {
	const [screenType, setScreenType] = React.useState('question')
	const [step, setStep] = React.useState(0)
	const [answers, setAnswers] = React.useState([])

	let isOver = screenType !== 'question'

	function calcProgress() {
		return Math.round(100 * step / questionList.length)
	}

	return (
		<>
			<div className='flex items-center justify-center h-screen'>
				<div className='p-4 bg-white rounded-lg w-[600px]'>
					<h1 className='my-4 text-3xl font-bold'>Formula one quiz</h1>
					<div className='h-4 bg-gray-300 rounded-full'>
						<div style={isOver ? { width: `100%` } : { width: `${calcProgress()}%` }} className='w-full h-full transition-all rounded-full bg-gradient-to-r from-purple-500 to-pink-500'></div>
					</div>
					{screenType === 'question'
						? <QuestionScreen
							step={step}
							setStep={setStep}
							setScreenType={setScreenType}
							answers={answers}
							setAnswers={setAnswers}
						/>
						: <EndScreen
							setScreenType={setScreenType}
							setStep={setStep}
							answers={answers}
							setAnswers={setAnswers}
						/>}
				</div>
			</div>
		</>
	)
}



