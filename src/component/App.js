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
	const [filteredSpecies, setFilteredSpecies] = useState([]);
	const [filteredHomeworlds, setFilteredHomeworlds] = useState([]);
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

	const handleSpeciesFilterChange = (e) => {
		if (e.length) {
			const speciesFilter = e.map((value) => value.value);
			setFilteredSpecies(speciesFilter);
			const filteredSpecies = filteredCharacters.filter((character) => {
				for (let species of speciesFilter) {
					if (character.species === species) {
						return { character };
					}
				}
			});
			setFilteredCharacters(filteredSpecies);
		}
		if (!e.length) {
			setFilteredCharacters(characters);
		}
	};

	const handleHomeworldsFilterChange = (e) => {
		if (e.length) {
			const homeworldsFilter = e.map((value) => value.value);
			setFilteredHomeworlds(homeworldsFilter);
			const filteredHomeworlds = filteredCharacters.filter(
				(character) => {
					for (let homeworld of homeworldsFilter) {
						if (character.homeworld === homeworld) {
							return { character };
						}
					}
				}
			);
			setFilteredCharacters(filteredHomeworlds);
		}
		if (!e.length) {
			setFilteredCharacters(characters);
		}
	};

	return (
		<div className={basicClassName}>
			{!loading ? (
				<>
					<h1 className={`${basicClassName}__heading`}>Characters</h1>
					<div className={`${basicClassName}__inputsAndBtnsSection`}>
						<FilteringSection
							basicClassName={`${basicClassName}__inputsAndBtnsSection`}
							filteredCharacters={filteredCharacters}
							handleSearchChange={handleSearchChange}
							handleSpeciesFilterChange={
								handleSpeciesFilterChange
							}
							handleHomeworldsFilterChange={
								handleHomeworldsFilterChange
							}
							filteredSpecies={filteredSpecies}
							filteredHomeworlds={filteredHomeworlds}
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
