import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Footer from "./Footer.jsx";
import Timer from "./Timer.jsx";
import {useQuiz} from "../context/QuizContext.jsx";

export default function App() {
	const {status} = useQuiz();
	return (
		<div className="app">
			<Header />
			<Main>
				<>
					{status === "loading" && <Loader />}
					{status === "error" && <Error />}
					{status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
					{status === "active" && (
						<>
							<Progress
								index={index}
								numQuestions={numQuestions}
								points={points}
								maxPossiblePoints={maxPossiblePoints}
								answer={answer}
							/>
							<Question question={questions.at(index)} dispatch={dispatch} answer={answer} />
							<Footer>
								<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
								<NextButton
									dispatch={dispatch}
									answer={answer}
									index={index}
									numQuestions={numQuestions}
								/>
							</Footer>
						</>
					)}
					{status === "finished" && (
						<FinishScreen
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							highScore={highScore}
							dispatch={dispatch}
						/>
					)}
				</>
			</Main>
		</div>
	);
}
