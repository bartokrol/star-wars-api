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
		const fetchOtherData = (characters) => {
			const charactersWithAllData = [];
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
								})
								.catch((err) => console.error(err));
						}
						if (!url.length) {
							if (url.search("species")) {
								character.species = "Unspecified";
							}
							if (url.search("vehicles")) {
								character.vehicles = "";
							}
							if (url.search("starships")) {
								character.starships = "";
							}
						}
					})
				).then(charactersWithAllData.push(character));
			});
			setCharacters(charactersWithAllData);
		};

		const fetchApi = () => {
			const characters = [];
			Promise.all(
				[api].map((api) =>
					fetch(api)
						.then((response) => response.json())
						.then((data) => characters.push(...data.results))
						.then((data) => fetchOtherData(characters))
						.then(setFetched(true))
				)
			);
		};
		fetchApi();
	}, []);

	return (
		<div className={basicClassName}>
			{fetched ? (
				<>
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
				</>
			) : null}
		</div>
	);
}

export default App;
