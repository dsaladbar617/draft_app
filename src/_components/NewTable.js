import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { DraftContext } from "../DraftContext";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";

const NewTable = () => {
	let { values, setters } = useContext(DraftContext);
	let [currentStats, setCurrentStats] = useState({});
	let [expanded, setExpanded] = useState([]);
	let [currentYearPicks, setCurrentYearPicks] = useState([]);
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14
		}
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover
		},
		// hide last border
		"&:last-child td, &:last-child th": {
			border: 0
		}
	}));

	useEffect(() => {
		setCurrentYearPicks([]);
		fetch(`https://statsapi.web.nhl.com/api/v1/draft/${values.draftYear}`)
			.then((res) => res.json())
			.then((data) => {
				let drafted = data.drafts[0].rounds.map((round) => round.picks).flat(2);

				setExpanded([...drafted.map(() => false)]);

				setCurrentYearPicks(drafted.slice());

				if (values.teamName) {
					setters.setPicks(
						drafted.filter((draft) => draft.team.name === values.teamName)
					);
				} else {
					setters.setPicks(drafted);
				}
			});
	}, [values.draftYear]);

	useEffect(() => {
		if (values.teamName) {
			setters.setPicks(
				values.picks.filter((draft) => draft.team.name === values.teamName)
			);
		} else {
			setters.setPicks(currentYearPicks);
		}
	}, [values.teamName]);

	const handleStats = async (id) => {
		if (id) {
			const stats = await fetch(
				`https://statsapi.web.nhl.com//api/v1/draft/prospects/${id}`
			)
				.then((res) => res.json())
				.then((data) => data.prospects[0].nhlPlayerId)
				.then((nhlId) => {
					return fetch(
						`https://statsapi.web.nhl.com//api/v1/people/${nhlId}/stats?stats=careerRegularSeason`
					)
						.then((res) => res.json())
						.then((data) => {
							return data.stats[0].splits.length > 0
								? data.stats[0].splits[0].stat
								: { value: "No NHL Data" };
						});
				});

			return stats;
		}
	};

	useEffect(() => {
		let stats = handleStats(values.setCurrentProspectId);
		console.log(stats);
	}, [values.setCurrentProspectId]);

	// useEffect(() => {
	// 	if (values.currentProspectId) {
	// 		fetch(
	// 			`https://statsapi.web.nhl.com//api/v1/draft/prospects/${values.currentProspectId}`
	// 		)
	// 			.then((res) => res.json())
	// 			.then((data) => data.prospects[0].nhlPlayerId)
	// 			.then((nhlId) => {
	// 				fetch(
	// 					`https://statsapi.web.nhl.com//api/v1/people/${nhlId}/stats?stats=careerRegularSeason`
	// 				)
	// 					.then((res) => res.json())
	// 					.then((data) => {
	// 						data.stats[0].splits.length > 0
	// 							? setCurrentStats(data.stats[0].splits[0].stat)
	// 							: setCurrentStats({ value: "No NHL Data" });
	// 					});
	// 			});
	// 	} else {
	// 		setCurrentStats({ value: "No NHL Data" });
	// 	}
	// }, [values.currentProspectId]);

	// useEffect(() => {
	// 	currentStats = [];
	// 	console.log(currentProspectId.current, "yuh");
	// 	Promise.all(
	// 		values.picks.map((pick) => {
	// 			if (pick.prospect.id !== undefined) {
	// 				return fetch(
	// 					`https://statsapi.web.nhl.com//api/v1/draft/prospects/${pick.prospect.id}`
	// 				)
	// 					.then((res) => res.json())
	// 					.then((data) => data.prospects[0].nhlPlayerId)
	// 					.then((data) => {
	// 						console.log(data);

	// 						console.log(data);

	// 						// console.log(data);

	// 						let playerId = data;
	// 						if (playerId !== undefined) {
	// 							return fetch(
	// 								`https://statsapi.web.nhl.com//api/v1/people/${playerId}/stats?stats=careerRegularSeason`
	// 							)
	// 								.then((res) => res.json())
	// 								.then((data) => {
	// 									// console.log(data.stats[0])

	// 									console.log(data.stats[0]);

	// 									if (data.stats[0].splits[0]) {
	// 										currentStats.push(data.stats[0].splits[0].stat);
	// 									} else {
	// 										currentStats.push("No NHL Stats");
	// 									}
	// 								});
	// 						} else {
	// 							currentStats.push("No NHL Stats");
	// 						}
	// 					});
	// 				// })

	// 				// })
	// 			} else {
	// 				// currentStats.push('No NHL Stats')
	// 			}
	// 		})
	// 	).then(() => console.log(values.draftYear, currentStats));
	// }, [currentProspectId]);

	const createData = (
		round,
		overAll,
		teamName,
		prospectName,
		prospectId,
		rowIndex
		// stats
	) => {
		return {
			round,
			overAll,
			teamName,
			prospectName,
			prospectId,
			rowIndex
			// stats: { stats }
		};
	};

	const handleClick = (index) => {
		let newArr = [...expanded];
		newArr[index] = !newArr[index];
		setExpanded(newArr);
	};

	const Row = (props) => {
		const { row } = props;
		return (
			<>
				<TableRow
					sx={{ "& > *": { borderBottom: "unset" } }}
					onClick={async () => {
						handleClick(row.rowIndex);
						if (!expanded[row.rowIndex]) {
							setters.setCurrentProspectId(row.prospectId);
							// let stats = await handleStats(row.prospectId);
							// row.stats = stats;
							// console.log(stats);
						}
					}}>
					<TableCell>
						<IconButton aria-label="expand row" size="small">
							{expanded[row.rowIndex] ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row" align="right">
						{row.round}
					</TableCell>
					<TableCell align="right">{row.overAll}</TableCell>
					<TableCell align="right">{row.teamName}</TableCell>
					<TableCell align="right">{row.prospectName}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
						<Collapse in={expanded[row.rowIndex]} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									{`${row.prospectName} Stats`}
								</Typography>
								{/* {`Assists: ${row.stats.assists}`} */}
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</>
		);
	};

	Row.propTypes = {
		row: PropTypes.shape({
			round: PropTypes.string.isRequired,
			overAll: PropTypes.number.isRequired,
			teamName: PropTypes.string.isRequired,
			prospectName: PropTypes.string.isRequired,
			prospectId: PropTypes.number,
			rowIndex: PropTypes.number.isRequired,
			stats: PropTypes.object
		})
	};

	const rows = values.picks
		? values.picks.map((pick, index) => {
				return createData(
					pick.round,
					pick.pickOverall,
					pick.team.name,
					pick.prospect.fullName,
					pick.prospect.id,
					index
					// currentStats
				);
		  })
		: null;

	return (
		<TableContainer sx={{ width: 2 / 3, margin: "auto" }} component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<StyledTableRow>
						<StyledTableCell />
						<StyledTableCell align="right">Round</StyledTableCell>
						<StyledTableCell align="right">Overall</StyledTableCell>
						<StyledTableCell align="right">Team Name</StyledTableCell>
						<StyledTableCell align="right">Prospect</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{rows
						? rows.map((row, index) => (
								<Row className="that" key={index} row={row} />
						  ))
						: null}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default NewTable;
