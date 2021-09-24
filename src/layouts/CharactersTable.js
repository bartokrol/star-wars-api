import { useTable } from "react-table";
import React from "react";

function CharactersTable({ filteredCharacters, handleSelectChange }) {
	const dataCharacters = filteredCharacters.map((character) => ({
		selectedCol: (
			<input
				id={character.id}
				checked={character.selected}
				type="checkbox"
				onChange={handleSelectChange}
			/>
		),
		nameCol: (
			<span>
				{character.name}
				<span>{character.species}</span>
			</span>
		),
		bornCol: character.born,
		homeworldCol: character.homeworld,
		vehiclesAndStarshipsCol: character.vehiclesAndStarships,
		statusCol: character.active,
		actionsCol: "",
	}));
	const data = React.useMemo(() => dataCharacters, [dataCharacters]);
	const columns = React.useMemo(
		() => [
			{
				Header: <input type="checkbox"></input>,
				accessor: "selectedCol",
			},
			{
				Header: (
					<p>
						Name <span>Icon</span>
					</p>
				),
				accessor: "nameCol",
			},
			{
				Header: (
					<p>
						Born <span>Icon</span>
					</p>
				),
				accessor: "bornCol",
			},
			{
				Header: (
					<p>
						Homeworld <span>Icon</span>
					</p>
				),
				accessor: "homeworldCol",
			},
			{
				Header: (
					<p>
						Vehicles and Starships <span>Icon</span>
					</p>
				),
				accessor: "vehiclesAndStarshipsCol",
			},
			{
				Header: (
					<p>
						Status <span>Icon</span>
					</p>
				),
				accessor: "statusCol",
			},
			{
				Header: (
					<p>
						Actions <span>Icon</span>
					</p>
				),
				accessor: "actionsCol",
			},
		],
		[]
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });
	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>
								{column.render("Header")}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default CharactersTable;
