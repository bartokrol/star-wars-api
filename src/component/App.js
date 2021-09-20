function App() {
	return (
		<div className="starWarsApi">
			<h1 className="starWarsApi__heading">Characters</h1>
			<div className="starWarsApi__filteringSection">
				<input
					type="text"
					className="starWarsApi__filteringSection__searchInput"
					placeholder="Search"
				></input>
				<select
					name="species"
					id="species"
					className="starWarsApi__filteringSection__species"
				>
					<option value="Species">Species</option>
				</select>
				<select
					name="homeworld"
					id="homeworld"
					className="starWarsApi__filteringSection__homeworld"
				>
					<option value="Homeworld">Homeworld</option>
				</select>
				<select
					name="status"
					id="status"
					className="starWarsApi__filteringSection__status"
				>
					<option value="Status">Status</option>
				</select>
			</div>
		</div>
	);
}

export default App;
