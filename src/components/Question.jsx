import Options from "./Options.jsx";
import {useQuiz} from "../context/QuizContext.jsx";

const Question = () => {
	const {questions, dispatch, answer, index} = useQuiz();
	const question = questions.at(index);

	return (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	);
};

export default Question;
