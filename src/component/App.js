import { useState, useEffect } from "react";
import FilteringSection from "../layouts/FilteringSection";
import ButtonsSection from "../layouts/ButtonsSection";
import CharactersTable from "../layouts/CharactersTable";
import "../styles/main.css";

function App() {
	const basicClassName = "starWarsApi";

	const api = `https://swapi.dev/api/people/`;
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		const fetchApi = () => {
			fetch(api)
				.then((data) => data.json())
				.then((data) => setCharacters([...data.results]))
				.catch((error) => console.log(error));
		};
		fetchApi();
	}, [api]);
	return (
		<div className={basicClassName}>
			<h1 className={`${basicClassName}__heading`}>Characters</h1>
			<div className={`${basicClassName}__inputsAndBtnsSection`}>
				<FilteringSection
					basicClassName={`${basicClassName}__inputsAndBtnsSection`}
				/>
				<ButtonsSection
					basicClassName={`${basicClassName}__inputsAndBtnsSection`}
				/>
			</div>
			<CharactersTable characters={characters} />
		</div>
	);
}

export default App;
