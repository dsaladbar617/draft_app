import React, { useEffect } from "react";
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
	let currentPicks = [];
	let currentStats = [];
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
		currentPicks = [];
		fetch(`https://statsapi.web.nhl.com/api/v1/draft/${values.draftYear}`)
			.then((res) => res.json())
			.then((data) => {
				data.drafts[0].rounds.forEach((draft) => {
					draft.picks.forEach((round) => {
						if (values.teamName !== "") {
							if (values.teamName === round.team.name) {
								currentPicks.push(round);
							}
						} else {
							currentPicks.push(round);
						}
					});
				});
				setters.setPicks(currentPicks);
			});
	}, [values.draftYear, values.teamName]);

	useEffect(() => {
		currentStats = [];
		Promise.all(
			values.picks.map((pick) => {
				if (pick.prospect.id !== undefined) {
					return fetch(
						`https://statsapi.web.nhl.com//api/v1/draft/prospects/${pick.prospect.id}`
					)
						.then((res) => res.json())
						.then((data) => data.prospects[0].nhlPlayerId)
						.then((data) => {
<<<<<<< HEAD
							console.log(data);
=======
							// console.log(data);
>>>>>>> abd8575da1a1a05eaee4d3ad2c603b7dd9049ffe
							let playerId = data;
							if (playerId !== undefined) {
								return fetch(
									`https://statsapi.web.nhl.com//api/v1/people/${playerId}/stats?stats=careerRegularSeason`
								)
									.then((res) => res.json())
									.then((data) => {
<<<<<<< HEAD
										// console.log(data.stats[0])
=======
										console.log(data.stats[0]);
>>>>>>> abd8575da1a1a05eaee4d3ad2c603b7dd9049ffe
										if (data.stats[0].splits[0]) {
											currentStats.push(data.stats[0].splits[0].stat);
										} else {
											currentStats.push("No NHL Stats");
										}
									});
							} else {
								currentStats.push("No NHL Stats");
							}
<<<<<<< HEAD
						});
					// })
=======
							// })
						});
>>>>>>> abd8575da1a1a05eaee4d3ad2c603b7dd9049ffe
				} else {
					// currentStats.push('No NHL Stats')
				}
			})
<<<<<<< HEAD
		).then(() => console.log(values.draftYear, currentStats));
=======
		).then();
>>>>>>> abd8575da1a1a05eaee4d3ad2c603b7dd9049ffe
	}, [values.picks]);

	const createData = (round, overAll, teamName, prospectName) => {
		return {
			round,
			overAll,
			teamName,
			prospectName
			// stats: {

			// }
		};
	};

	const Row = (props) => {
		const { row } = props;
		const [open, setOpen] = React.useState(false);

		return (
			<>
				<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
					<TableCell>
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpen(!open)}>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									{`${row.prospectName} Stats`}
								</Typography>
								{/* Add the player stats here */}
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
			stats: PropTypes.object
		})
	};

	const rows = values.picks.map((pick) => {
		return createData(
			pick.round,
			pick.pickOverall,
			pick.team.name,
			pick.prospect.fullName
		);
	});

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
					{rows.map((row) => (
						<Row className="that" key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default NewTable;
