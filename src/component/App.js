import FilteringSection from "./layouts/FilteringSection";
import ButtonsSection from "./layouts/ButtonsSection";

const basicClassName = "starWarsApi";

function App() {
	return (
		<div className={basicClassName}>
			<h1 className={`${basicClassName}__heading`}>Characters</h1>
			<div className={`${basicClassName}__inputsAndBtnsSection`}>
				<FilteringSection
					basicClassName={`${basicClassName}__inputsAndBtnsSection`}
				/>
				<ButtonsSection
					basicClassName={`${basicClassName}__inputsAndBtnsSection`}
				/>
			</div>
		</div>
	);
}

export default App;
