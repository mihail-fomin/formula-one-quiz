import * as React from 'react'
import { SendButton } from '../components/SendButton'
import { questionList } from '@/pages';

export default function QuestionScreen({ setScreenType, question }) {
	const [answer, setAnswer] = React.useState('');
	// const [error, setError] = React.useState('');
	const [status, setStatus] = React.useState('typing')
	const [index, setIndex] = React.useState(0)
	// const [hint, setHint] = React.useState(false)

	// let trueAnswer = item.rightAnswer
	let isLastQuestion = index === questionList.length - 1


	// function onInputChange(event) {
	// 	setAnswer(event.target.value);
	// }

	// function onShowHintClick(event) {
	// 	event.preventDefault()
	// 	setError('')
	// 	setHint(!hint)
	// }

	async function onSubmitButtonClick() {
		setError('')
		setStatus('loading');
		// setHint(false)
		await sleep(1500)
		if (validate(answer)) {
			setStatus('success');
		} else {
			// setError('Good guess but wrong answer')
			setStatus('typing')
		}
	}

	function onNextButtonClick() {
		if (isLastQuestion) {
			setScreenType('end')
		} else {
			setIndex(index + 1);
			setAnswer('')
			// setError('')
			setStatus('typing')
		}
	}

	return <>
		<p>Question {index + 1} of {questionList.length}</p>
		<p className='my-2 text-lg font-bold'>{question.title}</p>
		<form>
			<ul>
				{question.variants.map((text) =>
					<li
						className='p-2 my-2 border-2 border-purple-700 rounded-md cursor-pointer hover:bg-purple-100'
						key={text}
					>
						{text}
					</li>
				)}
			</ul>
			<SendButton
				disabled={!answer.length || status === 'loading'}
				onClick={status === 'success' ? onNextButtonClick : onSubmitButtonClick}>
				{status === 'success' ? (isLastQuestion ? 'Show results' : 'Next question') :
					status === 'loading' ? 'Loading...' :
						'Submit'}
			</SendButton>
			{/* {status !== 'success' &&
				<button
					className='inline-block p-2 m-2 text-white rounded cursor-pointer w-28 bg-sky-600 hover:bg-sky-700'
					onClick={onShowHintClick}
				>
					{hint === false ? `Show hint` : `Hide hint`}
				</button>
			} */}
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
			{/* {error !== null &&
				<p className="text-xl text-red-600">
					{error}
				</p>
			} */}
			{/* {hint === true &&
				<p>
					Right answer is <span className='text-xl text-green-700'>{trueAnswer}</span>
				</p>
			} */}
		</form>
	</>
}