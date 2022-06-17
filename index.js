function App() {
	const [displayTime, setDisplayTime] = React.useState(25 * 60)

	const formatTime = (time) => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return (minutes < 10 ? '0' + minutes : minutes) +
			':' +
			(seconds < 10 ? '0' + seconds : seconds)
	}

	// display remaining time until break
	return (
		<div>
			<Length title={'break length'} changetime={null} type={'break'} time={null} formatTime />
			<h1>{formatTime(displayTime)}</h1>
		</div>
	)

	// Fixed missing html tags and babel calling `require` error. Adding length function to change break duration.
	function Length({ title, changetime, type, time, formatTime }) {
		return (
			<div>
				<h3>{title}</h3>
				<div className='time-sets'>
					<span className='material-symbols-outlined'>
						arrow_downward
					</span>
					<h3>formatTime{time}   </h3>
					<span className='material-symbols-outlined'>
						arrow_upward
					</span>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
