function App() {
	const [displayTime, setDisplayTime] = React.useState(25 * 60)
	const [breakTime, setBreakTime] = React.useState(5 * 60)
	const [sessionTime, setSessionTime] = React.useState(25 * 60)
	const [timerOn, setTimerOn] = React.useState(false)

	const formatTime = (time) => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return (minutes < 10 ? '0' + minutes : minutes) +
			':' +
			(seconds < 10 ? '0' + seconds : seconds)
	}

	// Arrow icons can modify break and session time
	const changeTime = (amount, type) => {
		if (type == 'break') {
			// breakTime cannot go below zero
			if (breakTime <= 60 && amount < 0) {
				return;
			}
			setBreakTime(prev => prev + amount)
		} else {
			// sessionTime cannot go below zero
			if (sessionTime <= 60 && amount < 0) {
				return;
			}
			setSessionTime(prev => prev + amount)
			// If timer is not on, set to sessionTime plus amount. 
			if (!timerOn) {
				setDisplayTime(sessionTime + amount)
			}
		}
	}

	// Render buttons.
	return (
		<div>
			<Length title={'break length'} changeTime={changeTime} type={'break'} time={breakTime} formatTime={formatTime} />
			<Length title={'session length'} changeTime={changeTime} type={'session'} time={sessionTime} formatTime={formatTime} />
			<h1>{formatTime(displayTime)}</h1>
		</div>
	)

	// Fixed missing html tags and babel calling `require` error. Length function to change break and sessionn duration.
	function Length({ title, changeTime, type, time, formatTime }) {
		return (
			<div >
				<h3>{title}</h3>
				<div className='time-sets'>
					<button className='material-symbols-outlined' onClick={() => changeTime(-60, type)}>
						arrow_downward
					</button>
					<h3>{formatTime(time)}   </h3>
					<button className='material-symbols-outlined' onClick={() => changeTime(+60, type)}>
						arrow_upward
					</button>
				</div>
			</div>
		)
	}
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App name='index.js' />)