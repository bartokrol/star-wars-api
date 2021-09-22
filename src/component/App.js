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
			}, 2000);
		};

		const fetchArray = (array, arrName) => {
			for (let elem of array) {
				fetch(elem).then((response) =>
					response.json().then((data) => {
						array.shift();
						array.push(data.name);
					})
				);
			}
			if (arrName === "species") {
				if (!array.length) {
					array.push("Unspecified");
				}
			}
		};

		async function fetchOtherData(characters) {
			await characters.forEach((character) => {
				const homeworld = character.homeworld;
				const vehicles = character.vehicles;
				const starships = character.starships;
				const species = character.species;

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

				fetchArray(vehicles);
				fetchArray(starships);
				fetchArray(species, "species");
			});
			await setCharacters(characters);
			await fetchedTimeout();
		}

		const fetchAllCharacters = (allCharacters, data) => {
			if (data.next) {
				fetch(data.next)
					.then((response) => response.json())
					.then((data) => {
						allCharacters.push(...data.results);
						fetchAllCharacters(allCharacters, data);
					});
			}
			if (!data.next) {
				fetchOtherData(allCharacters);
			}
		};

		async function fetchApi() {
			const allCharacters = [];
			await fetch(api)
				.then((response) => response.json())
				.then((data) => {
					allCharacters.push(...data.results);
					fetchAllCharacters(allCharacters, data);
				})
				.catch((error) => console.log(error));
		}
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
							characters={characters}
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
