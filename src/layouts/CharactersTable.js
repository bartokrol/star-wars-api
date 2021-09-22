import { useTable } from "react-table";
import React from "react";

function CharactersTable({ characters }) {
	// console.log(characters);
	const dataCharacters = characters.map((character) => ({
		checkboxCol: <input type="checkbox"></input>,
		nameCol: character.name,
		bornCol: character.birth_year,
		homeworldCol: character.homeworld,
		vehiclesAndStarshipsCol: [
			...character.vehicles,
			...character.starships,
		],
		statusCol: "",
		actionsCol: "",
	}));

	const data = React.useMemo(() => dataCharacters, [dataCharacters]);

	const columns = React.useMemo(
		() => [
			{
				Header: <input type="checkbox"></input>,
				accessor: "checkboxCol",
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
