import { useState, useEffect } from "react";
import FilteringSection from "../layouts/FilteringSection";
import ButtonsSection from "../layouts/ButtonsSection";
import CharactersTable from "../layouts/CharactersTable";
import "../styles/main.css";

function App() {
	const basicClassName = "starWarsApi";
	const api = `https://swapi.dev/api/people/`;
	const [characters, setCharacters] = useState([]);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		const fetchedTimeout = () => {
			setTimeout(() => {
				setFetched(true);
			}, 1000);
		};

		const fetchOtherData = (characters) => {
			characters.forEach((character) => {
				const homeworld = character.homeworld;
				fetch(homeworld).then((response) =>
					response.json().then((data) =>
						setCharacters((prevData) =>
							prevData.map((prevCharacter) =>
								prevCharacter.homeworld === homeworld
									? {
											...prevCharacter,
											homeworld: data.name,
									  }
									: prevCharacter
							)
						)
					)
				);
			});
			setCharacters(characters);
			fetchedTimeout();
		};

		const fetchApi = () => {
			fetch(api)
				.then((data) => data.json())
				.then((data) => {
					fetchOtherData([...data.results]);
				})
				.catch((error) => console.log(error));
		};
		fetchApi();
	}, []);

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
			{fetched ? <CharactersTable characters={characters} /> : null}
		</div>
	);
}

export default App;
