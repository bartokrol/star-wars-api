const FilteringSection = ({ basicClassName, characters }) => {
	const filteringSectionClass = `${basicClassName}__filteringSection`;
	// const filterTheSpecies = () => {
	// 	const species = characters.map((character) => character.species);
	// 	const filteredSpecies = [...new Set(species)];
	// 	return filteredSpecies;
	// };
	// const filteringSpecies = filterTheSpecies();
	// const speciesOptions = filteringSpecies.map((option) => (
	// 	<option key={option} value={option}>
	// 		{option}
	// 	</option>
	// ));

	const filterTheOptions = () => {
		const options = characters.map((character) => character.homeworld);
		const filteredOptions = [...new Set(options)];
		return filteredOptions;
	};
	const filteringHomeworld = filterTheOptions();
	const homeworldOptions = filteringHomeworld.map((option) => (
		<option key={option} value={option}>
			{option}
		</option>
	));

	return (
		<div className={filteringSectionClass}>
			<input
				type="text"
				className={`${filteringSectionClass}__searchInput`}
				placeholder="Search"
			></input>
			<select
				name="species"
				id="species"
				className={`${filteringSectionClass}__species`}
			>
				<option value="Species">Species</option>
				{/* {speciesOptions}; */}
			</select>
			<select
				name="homeworld"
				id="homeworld"
				className={`${filteringSectionClass}__homeworld`}
			>
				<option value="Homeworld">Homeworld</option>
				{/* {homeworldOptions} */}
			</select>
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
