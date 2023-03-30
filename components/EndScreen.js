import { NextButton } from "./NextButton";

export default function EndScreen({ setScreenType, setStep, answers, setAnswers }) {

	function onStartAgainClick() {
		setScreenType('question')
		setStep(0);
		setAnswers([])
	}

	function calcCorrectAnswers() {
		let count = 0
		for (let elem of answers) {
			if (elem[1] === true) { count++ }
		}
		return count
	}

	return <>
		<h2 className="my-2 text-xl">Congratulations! You have finished the quiz!</h2>
		<div className="mb-4 text-xl">
			You have just given <span className="font-bold">{calcCorrectAnswers()}</span> of
			<span className="font-bold"> {answers.length}</span> correct answers!
		</div>
		<NextButton
			onClick={() => onStartAgainClick()}>
			Start again?
		</NextButton>
	</>
}