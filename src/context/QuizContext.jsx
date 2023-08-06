import Error from "../components/Error.jsx";
import {createContext, useContext, useEffect, useReducer} from "react";

const SECONDS_PER_QUESTION = 20;
const QuizContext = createContext(null);

const initialState = {
	questions: [],
	// loading, error, ready, active, finished
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {...state, questions: action.payload, status: "ready"};
		case "dataFailed":
			return {...state, status: "error"};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
			};
		case "newAnswer":
			// eslint-disable-next-line no-case-declarations
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption ? state.points + question.points : state.points,
			};
		case "nextQuestion":
			return {...state, index: state.index + 1, answer: null};
		case "finish":
			return {
				...state,
				status: "finished",
				index: action.payload,
				highScore: state.points > state.highScore ? state.points : state.highScore,
			};
		case "restart":
			return {...initialState, questions: state.questions, status: "active"};
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finished" : state.status,
			};
		default:
			throw new Error("Unknown Action!");
	}
}

function QuizProvider({children}) {
	const [{questions, status, index, answer, points, highScore, secondsRemaining}, dispatch] =
		useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then(res => res.json())
			.then(data => dispatch({type: "dataReceived", payload: data}))
			.catch(() => dispatch({type: "dataFailed"}));
	}, [dispatch]);

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highScore,
				secondsRemaining,
				numQuestions,
				maxPossiblePoints,
				dispatch,
			}}>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined) throw new Error("Trying to access QuizContext outside QuizProvider!");
	return context;
}

export {QuizProvider, useQuiz};
