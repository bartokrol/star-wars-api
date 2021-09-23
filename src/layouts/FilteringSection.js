import Select from "react-select";

const FilteringSection = ({
	basicClassName,
	filteredCharacters,
	searchInput,
	handleSearchChange,
	handleSpeciesFilterChange,
	handleHomeworldsFilterChange,
}) => {
	const filteringSectionClass = `${basicClassName}__filteringSection`;
	const speciesOptions = [];
	const homeworldOptions = [];

	const filterOptions = (type, optionsType) => {
		const options = filteredCharacters.map((character) =>
			type === "homeworld" ? character.homeworld : character.species
		);
		const filteredOptions = [...new Set(options)];
		filteredOptions.map((option) =>
			optionsType.push({ value: option, label: option, type: type })
		);
	};

	filterOptions("homeworld", homeworldOptions);
	filterOptions("species", speciesOptions);

	return (
		<div className={filteringSectionClass}>
			<input
				type="text"
				className={`${filteringSectionClass}__searchInput`}
				placeholder="Search"
				value={searchInput}
				onChange={handleSearchChange}
			></input>
			<Select
				isMulti
				placeholder="Species"
				className={`${filteringSectionClass}__species`}
				options={speciesOptions}
				onChange={handleSpeciesFilterChange}
			/>
			<Select
				isMulti
				placeholder="Homeworld"
				className={`${filteringSectionClass}__homeworld`}
				options={homeworldOptions}
				onChange={handleHomeworldsFilterChange}
			/>
			<select
				name="status"
				id="status"
				className={`${filteringSectionClass}__status`}
			>
				<option value="Status">Status</option>
			</select>
		</div>
	);
};

export default FilteringSection;
