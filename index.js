function App() {
	const [displayTime, setDisplayTime] = React.useState(25 * 60)
	const [breakTime, setBreakTime] = React.useState(5 * 60)
	const [sessionTime, setSessionTime] = React.useState(25 * 60)
	const [timerOn, setTimerOn] = React.useState(false)
	const [onBreak, setOnBreak] = React.useState(false)
	const [breakAudio, setBreakAudio] = React.useState(new Audio('./breakTime.mp3'))

	// Play sound on break time starting
	const playBreakSound = () => {
		breakAudio.currentTime = 0;
		breakAudio.play();
	}

	const formatTime = (time) => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return (
			(minutes < 10 ? '0' + minutes : minutes) +
			':' +
			(seconds < 10 ? '0' + seconds : seconds)
		);
	};

	// Arrow icons can modify break and session time. AmountExtra argument == extra amount of time.
	const changeTime = (amountExtra, type) => {
		if (type == 'break') {
			// breakTime cannot go below zero
			if (breakTime <= 60 && amountExtra < 0) {
				return;
			}
			setBreakTime((prev) => prev + amountExtra)
		} else {
			// sessionTime cannot go below zero
			if (sessionTime <= 60 && amountExtra < 0) {
				return;
			}
			setSessionTime((prev) => prev + amountExtra)
			// If timer is not on, set to sessionTime plus amount. 
			if (!timerOn) {
				setDisplayTime(sessionTime + amountExtra)
			}
		}
	}

	// Give play and pause functionality to play button
	const controlTime = () => {
		let second = 1000;
		let date = new Date().getTime();
		let nextDate = new Date().getTime() + second;
		let onBreakVariable = onBreak;

		// Set time limit before function restarts.
		if (!timerOn) {
			let interval = setInterval(() => {
				date = new Date().getTime();
				if (date > nextDate) {
					setDisplayTime((prev) => {

						// If we are not on break and timer has run out, play break sound, else set to false.
						if (prev <= 0 && !onBreakVariable) {
							playBreakSound();
							onBreakVariable = true;
							setOnBreak(true);
							return breakTime;
						} else if (prev <= 0 && onBreakVariable) {
							playBreakSound();
							onBreakVariable = false;
							setOnBreak(false);
							return sessionTime;
						}
						return prev - 1;
					})
					nextDate += second;
				}
			}, 30);

			// So that we can clear the interval
			localStorage.clear();
			// Store interval as global variable
			localStorage.setItem('interval-id', interval)
		}

		// Make timer pause
		if (timerOn) {
			clearInterval(localStorage.getItem('interval-id'));
		}
		setTimerOn(!timerOn)
	}


	// Set time back to original state.
	const resetTime = () => {
		setDisplayTime(25 * 60)
		setBreakTime(5 * 60)
		setSessionTime(25 * 60)
	}

	// Render buttons.
	return (
		<div className='main-container'>
			<h1 className='test'>Pomodoro Clock</h1>
			<div className='dual-container'>
				<Length title={'Break length'} changeTime={changeTime} type={'break'} time={breakTime} formatTime={formatTime} />
				<Length title={'Session length'} changeTime={changeTime} type={'session'} time={sessionTime} formatTime={formatTime} />
			</div>
			<div className='timer-wrapper'>
				<h3>{onBreak ? 'Break' : 'Session'}</h3>
				<h1>{formatTime(displayTime)}</h1>
			</div>

			{/* Add button that switches between play and pause*/}
			<i onClick={controlTime}>
				{timerOn ? (
					<i className='material-symbols-outlined' >pause</i>
				) : (
					<i className='material-symbols-outlined' >play_arrow</i>
				)}
			</i>
			{/* Add auto renew button*/}
			<i className='material-symbols-outlined' onClick={resetTime}>autorenew</i>
		</div>
	)

	// Fixed missing html tags and babel calling `require` error. Length function to change break and sessionn duration.
	function Length({ title, changeTime, type, time, formatTime }) {
		return (
			<div >
				<h3>{title}</h3>
				<div className='time-sets'>
					<i className='material-symbols-outlined ' onClick={() => changeTime(-60, type)}>
						arrow_downward
					</i>
					<h3>{formatTime(time)}   </h3>
					<i className='material-symbols-outlined' onClick={() => changeTime(+60, type)}>
						arrow_upward
					</i>
				</div>
			</div>
		)
	}
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App name='index.js' />)