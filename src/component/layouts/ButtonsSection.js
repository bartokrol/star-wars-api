const ButtonsSection = ({ basicClassName }) => {
	const buttonsSectionClass = `${basicClassName}__buttonsSection`;

	return (
		<div className={buttonsSectionClass}>
			<button className={`${buttonsSectionClass}__deactivateBtn`}>
				Deactivate characters
			</button>
			<button className={`${buttonsSectionClass}__removeBtn`}>
				Remove characters
			</button>
		</div>
	);
};

export default ButtonsSection;
