import { useState, useEffect } from "react";
import FilteringSection from "../layouts/FilteringSection";
import ButtonsSection from "../layouts/ButtonsSection";
import CharactersTable from "../layouts/CharactersTable";
import "../styles/main.css";

function App() {
	const basicClassName = "starWarsApi";
	const api = `https://swapi.dev/api/people/`;
	const [characters, setCharacters] = useState([]);
	const [filteredCharacters, setFilteredCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		const charactersWithAllData = [];

		const fetchOtherData = (characters) => {
			characters.forEach((character) => {
				const homeworld = character.homeworld;
				const species = character.species;
				const vehicles = character.vehicles;
				const starships = character.starships;
				let urls = [homeworld, ...species, ...vehicles, ...starships];
				Promise.all(
					urls.map((url) => {
						if (url.length) {
							fetch(url)
								.then((response) => response.json())
								.then((data) => {
									if (url.search("species") > 0) {
										character.species = data.name;
									}
									if (url.search("planets") > 0) {
										character.homeworld = data.name;
									}
									if (url.search("vehicles") > 0) {
										character.vehicles.shift();
										character.vehicles.push(data.name);
									}
									if (url.search("starships") > 0) {
										character.starships.shift();
										character.starships.push(data.name);
									}
									if (!character.species.length) {
										character.species = "Unspecified";
									}
								})
								.catch((err) => console.error(err));
						}
					})
				).then(charactersWithAllData.push(character));
			});
			setCharacters(charactersWithAllData);
			setFilteredCharacters(charactersWithAllData);
		};

		const fetchApi = () => {
			const characters = [];
			Promise.all(
				[api].map((api) =>
					fetch(api)
						.then((response) => response.json())
						.then((data) => characters.push(...data.results))
						.then((data) => {
							fetchOtherData(characters);
							setLoading(false);
						})
				)
			);
		};
		fetchApi();
	}, []);

	const handleSearchChange = (e) => {
		const searchInputText = e.target.value;
		setSearchInput(searchInputText);
		const stateCharacters = characters;
		const foundCharacters = stateCharacters.filter(
			(character) => character.name.search(searchInputText) >= 0
		);
		setFilteredCharacters(foundCharacters);
	};

	return (
		<div className={basicClassName}>
			{!loading ? (
				<>
					<h1 className={`${basicClassName}__heading`}>Characters</h1>
					<div className={`${basicClassName}__inputsAndBtnsSection`}>
						<FilteringSection
							basicClassName={`${basicClassName}__inputsAndBtnsSection`}
							characters={characters}
							handleSearchChange={handleSearchChange}
						/>
						<ButtonsSection
							basicClassName={`${basicClassName}__inputsAndBtnsSection`}
						/>
					</div>
					<CharactersTable filteredCharacters={filteredCharacters} />
				</>
			) : null}
		</div>
	);
}

export default App;
