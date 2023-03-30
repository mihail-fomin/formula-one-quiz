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

export default function QuestionScreen({ step, setStep, setScreenType, answers, setAnswers }) {
	const [activeIndex, setActiveIndex] = React.useState();
	const [status, setStatus] = React.useState('awaiting')

	const question = questionList[step];
	let isLastQuestion = step === questionList.length - 1


	function onChooseVariant(index) {
		setActiveIndex(index)
		setStatus('chosen')
	}

	function onNextButtonClick() {
		answers.push([step, activeIndex == question.correct])
		setAnswers(answers)

		if (isLastQuestion) {
			setScreenType('end')
		} else {
			setActiveIndex()
			setStep(step + 1);
			setStatus('awaiting')
		}
	}


	return <>
		<p>Question {step + 1} of {questionList.length}</p>
		<p className='my-2 text-lg font-bold'>{question.title}</p>
		<form>
			<div>
				{question.variants.map((text, index) =>
					<Item key={text} active={activeIndex == index} onClick={() => onChooseVariant(index)}>{text}</Item>
				)}
			</div>
			<NextButton
				disabled={status === 'awaiting'}
				onClick={() => onNextButtonClick()}>
				{status === 'chosen' ? (isLastQuestion ? 'Show results' : 'Next question') : 'Next question'}
			</NextButton>
		</form>
	</>
}