const FilteringSection = ({
	basicClassName,
	speciesOptions,
	homeworldOptions,
}) => {
	const filteringSectionClass = `${basicClassName}__filteringSection`;

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
				{speciesOptions};
			</select>
			<select
				name="homeworld"
				id="homeworld"
				className={`${filteringSectionClass}__homeworld`}
			>
				<option value="Homeworld">Homeworld</option>
				{homeworldOptions}
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
