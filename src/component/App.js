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
				Promise.allSettled(
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
				).then(
					charactersWithAllData.push({
						selected: false,
						name: character.name,
						species: character.species,
						born: character.birth_year,
						homeworld: character.homeworld,
						vehiclesAndStarships: [
							...character.vehicles,
							...character.starships,
						],
						active: true,
						action: {
							edit: false,
							deactivate: false,
							remove: false,
						},
					})
				);
			});

			setCharacters(charactersWithAllData);
			setFilteredCharacters(charactersWithAllData);
			setLoading(false);
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
						})
				)
			);
		};
		fetchApi();
	}, []);

	const handleSearchChange = (e) => {
		const searchInputText = e.target.value;
		setSearchInput(searchInputText);
		const filterSearchCharacters = characters.filter(
			(character) => character.name.search(searchInputText) >= 0
		);

		setFilteredCharacters(filterSearchCharacters);
		const filteredCharacters = [];

		if (filteredSpecies.length) {
			for (let species of filteredSpecies) {
				const speciesCharFiltered = filterSearchCharacters.filter(
					(character) => character.species === species
				);
				filteredCharacters.push(...speciesCharFiltered);
			}
			setFilteredCharacters(filteredCharacters);
		}
		if (filteredHomeworlds.length) {
			for (let homeworld of filteredHomeworlds) {
				const homeworldCharFiltered = filteredCharacters.filter(
					(character) => character.homeworlds === homeworld
				);
				filteredCharacters.push(...homeworldCharFiltered);
			}
			setFilteredCharacters(filteredCharacters);
		}
		// if (filteredHomeworlds.length && filteredCharacters.lenght) {
		// 	for (let homeworld of filteredHomeworlds) {
		// 		const homeworldCharFiltered = filterSearchCharacters.filter(
		// 			(character) => character.homeworlds === homeworld
		// 		);
		// 		filteredCharacters.push(...homeworldCharFiltered);
		// 	}
		// 	console.log(filteredCharacters);
		// 	setFilteredCharacters(filteredCharacters);
		// }
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
			setFilteredSpecies([]);
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
			setFilteredHomeworlds([]);
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
							searchInput={searchInput}
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
