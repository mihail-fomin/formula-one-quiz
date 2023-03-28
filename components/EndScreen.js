

export default function EndScreen({ setScreenType }) {
	return <>
		Congratulations! You have finished the quiz!
		<button
			className='block p-2 m-2 text-white rounded cursor-pointer bg-sky-600 hover:bg-sky-700'
			onClick={() => setScreenType('question')}>
			Start again?
		</button>
	</>
}