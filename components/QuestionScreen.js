import * as React from 'react'
import { NextButton } from './NextButton'
import { questionList } from '@/pages';
import { twMerge } from 'tailwind-merge';

function Item({ active, children, onClick }) {
	const commonCn = `p-2 my-2 border-2 border-purple-700 rounded-md cursor-pointer hover:bg-purple-100 hover:transition-all`
	const activeCn = active ? `
	text-white bg-purple-600 hover:bg-purple-700 transition ease-in-out
	` : ``

	return (
		<div className={twMerge(commonCn + activeCn)} onClick={onClick} >
			{children}
		</div>
	)
}

export default function QuestionScreen({ setScreenType, question }) {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [status, setStatus] = React.useState('awaiting')
	const [index, setIndex] = React.useState(0)

	let isLastQuestion = index === questionList.length - 1


	function onChooseVariant() {

	}

	// function onNextButtonClick() {
	// 	if (isLastQuestion) {
	// 		setScreenType('end')
	// 	} else {
	// 		setIndex(index + 1);
	// 		setStatus('awaiting')
	// 	}
	// }

	return <>
		<p>Question {index + 1} of {questionList.length}</p>
		<p className='my-2 text-lg font-bold'>{question.title}</p>
		<form>
			<div>
				{question.variants.map((text, i) =>
					<Item active={activeIndex == i} onClick={() => setActiveIndex(i)} > {text}</Item>
				)}
			</div>
			<NextButton
				disabled={status === 'awaiting'}
				onClick={status === 'success' ? onNextButtonClick : ''}>
				{status === 'success' ? (isLastQuestion ? 'Show results' : 'Next question') :
					status === 'loading' ? 'Loading...' :
						'Submit'}
			</NextButton>
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
		</form>
	</>
}