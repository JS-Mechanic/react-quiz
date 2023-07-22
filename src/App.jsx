import Header from "./Header.jsx";
import Main from "./Main.jsx";

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then(res => res.json())
			.then(data => dispatch({type: "dataReceived", payload: data}))
			.catch(err => dispatch({type: "dataFailed"}));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				<p>1/15</p>
				<p>Question?</p>
			</Main>
		</div>
	);
}
