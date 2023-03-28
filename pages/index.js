import * as React from 'react'
import { SendButton } from '../components/SendButton'

const firstRace = 'https://ik.imagekit.io/i7lh9dcka/F1/tr:w-400/1950.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675082886754'
const maxVerstappen = 'https://ik.imagekit.io/i7lh9dcka/F1/tr:w-400/max.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675083426060'
const champions = 'https://ik.imagekit.io/i7lh9dcka/F1/tr:w-400/Lewis-and-Michael.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675084274601'

const questionList = [
	{
		id: 0,
		question: 'Which year the first F1 race was held?',
		variants: ['1929', '1945', '1960', '1950'],
		correct: 3,
		picture: firstRace
	},
	{
		id: 1,
		question: 'Who is the current (march 2023) F1 Champion?',
		variants: ['Lewis Hamilton', 'Max Verstappen', 'Fernando Alonso'],
		correct: 1,
		picture: maxVerstappen
	},
	{
		id: 2,
		question: 'How many F1 drivers managed to become a world champoin for 7 times?',
		variants: ['0', '1', '2'],
		correct: 2,
		picture: champions
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

	return (
		<>
			<div className='flex items-center justify-center h-screen'>
				<div className='p-4 bg-white rounded-lg w-[600px]'>
					<div>Progress bar</div>
					<h1 className='my-4 text-xl'>Formula one quiz</h1>
					{screenType === 'question'
						? <QuestionScreen setScreenType={setScreenType} />
						: <EndScreen setScreenType={setScreenType} />}
				</div>
			</div>
		</>
	)
}

function QuestionScreen({ setScreenType }) {
	const [answer, setAnswer] = React.useState('');
	const [error, setError] = React.useState('');
	const [status, setStatus] = React.useState('typing')
	const [index, setIndex] = React.useState(0)
	const [hint, setHint] = React.useState(false)

	let item = questionList[index];
	let trueAnswer = item.rightAnswer
	let isLastQuestion = index === questionList.length - 1

	function validate(answer) {
		return answer.toLowerCase() === trueAnswer.toLowerCase()
	}

	function onInputChange(event) {
		setAnswer(event.target.value);
	}

	function onShowHintClick(event) {
		event.preventDefault()
		setError('')
		setHint(!hint)
	}

	async function onSubmitButtonClick() {
		setError('')
		setStatus('loading');
		setHint(false)
		await sleep(1500)
		if (validate(answer)) {
			setStatus('success');
		} else {
			setError('Good guess but wrong answer')
			setStatus('typing')
		}
	}

	function onNextButtonClick() {
		if (isLastQuestion) {
			setScreenType('end')
		} else {
			setIndex(index + 1);
			setAnswer('')
			setError('')
			setStatus('typing')
		}
	}

	return <>
		<p>Question {index + 1} of {questionList.length}</p>
		<p className='my-2'>{item.question}</p>
		<form>
			<input
				className='w-full p-2 border-2 rounded border-sky-600 focus:outline-none focus:ring focus:border-blue-500'
				value={answer}
				onChange={onInputChange}
				disabled={status === 'loading'}
			/>
			<SendButton
				disabled={!answer.length || status === 'loading'}
				onClick={status === 'success' ? onNextButtonClick : onSubmitButtonClick}>
				{status === 'success' ? (isLastQuestion ? 'Show results' : 'Next question') :
					status === 'loading' ? 'Loading...' :
						'Submit'}
			</SendButton>
			{status !== 'success' &&
				<button
					className='inline-block p-2 m-2 text-white rounded cursor-pointer w-28 bg-sky-600 hover:bg-sky-700'
					onClick={onShowHintClick}
				>
					{hint === false ? `Show hint` : `Hide hint`}
				</button>
			}

			{status === 'success' &&
				<div className='relative'>
					<p className='text-xl text-green-700'>
						Quite right you are!!!
					</p>
					<img
						src={item.picture}
						alt='right answer picture'
					/>
				</div>

			}
			{error !== null &&
				<p className="text-xl text-red-600">
					{error}
				</p>
			}
			{hint === true &&
				<p>
					Right answer is <span className='text-xl text-green-700'>{trueAnswer}</span>
				</p>
			}
		</form>
	</>
}

function EndScreen({ setScreenType }) {
	return <>
		Congratulations! You have finished the quiz!
		<button
			className='block p-2 m-2 text-white rounded cursor-pointer bg-sky-600 hover:bg-sky-700'
			onClick={() => setScreenType('question')}>
			Start again?
		</button>
	</>
}