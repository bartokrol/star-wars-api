import Select from "react-select";

const FilteringSection = ({
	basicClassName,
	characters,
	handleSearchChange,
}) => {
	const filteringSectionClass = `${basicClassName}__filteringSection`;
	const speciesOptions = [];
	const homeworldOptions = [];

	const filterTheSpecies = () => {
		const options = characters.map((character) => character.species);
		const filteredOptions = [...new Set(options)];
		filteredOptions.map((option) =>
			speciesOptions.push({ value: option, label: option })
		);
	};

	const filterTheHomeworld = () => {
		const options = characters.map((character) => character.homeworld);
		const filteredOptions = [...new Set(options)];
		filteredOptions.map((option) =>
			homeworldOptions.push({ value: option, label: option })
		);
	};
	filterTheHomeworld();
	filterTheSpecies();
	console.log(speciesOptions);
	console.log(homeworldOptions);

	return (
		<div className={filteringSectionClass}>
			<input
				type="text"
				className={`${filteringSectionClass}__searchInput`}
				placeholder="Search"
				onChange={handleSearchChange}
			></input>
			<Select
				isMulti
				placeholder="Species"
				className={`${filteringSectionClass}__species`}
				options={speciesOptions}
			/>
			<Select
				isMulti
				placeholder="Homeworld"
				className={`${filteringSectionClass}__homeworld`}
				options={homeworldOptions}
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
