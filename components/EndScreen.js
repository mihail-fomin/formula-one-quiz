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
			You have just given {calcCorrectAnswers()} of {answers.length} correct answers!
		</div>
		<button
			className='block p-2 m-2 text-white rounded cursor-pointer bg-sky-600 hover:bg-sky-700'
			onClick={() => onStartAgainClick()}>
			Start again?
		</button>
	</>
}