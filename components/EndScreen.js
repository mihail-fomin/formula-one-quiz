export default function EndScreen({ setScreenType, setStep }) {
	function onStartAgainClick() {
		setScreenType('question')
		setStep(0);
	}

	return <>
		Congratulations! You have finished the quiz!
		<button
			className='block p-2 m-2 text-white rounded cursor-pointer bg-sky-600 hover:bg-sky-700'
			onClick={() => onStartAgainClick()}>
			Start again?
		</button>
	</>
}