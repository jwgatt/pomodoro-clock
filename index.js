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
			<Length title={'break length'} changetime={null} type={'break'} time={null} formattime />
			<h1>{formatTime(displayTime)}</h1>
		</div>
	)

	// Fixed missing html tags and a dep calling `require` error, compiler perhaps not recognising babel as a module. Adding length function to change break duration.
	// ESLint not autofilling quotes in className
	function Length({ title, changetime, type, time, formattime }) {
		return (
			<div>
				<h3>{title}</h3>
				<div className='time-sets'>
					<button className='placeholder'>
						<i className='placeholder'></i>
					</button>
				</div>
			</div>
		)
	}

}

ReactDOM.render(<App />, document.getElementById('root'))
