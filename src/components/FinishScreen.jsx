export default function FinishScreen({points, maxPossiblePoints, highScore}) {
	const percentage = (points / maxPossiblePoints) * 100;
	let emoji;
	if (percentage === 100) emoji = "🥇";
	else if (percentage < 100 && percentage >= 80) emoji = "🥈";
	else if (percentage < 80 && percentage >= 50) emoji = "🥉";
	else if (percentage < 50 && percentage > 0) emoji = "😬";
	else if (percentage === 0) emoji = "🤦🏻";

	return (
		<>
			<p className="result">
				<span>{emoji} </span>You scored <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className="highscore">(High score: {highScore} points)</p>
		</>
	);
}
