// import React, { useContext, useEffect } from "react";
// import Select from "react-select";
// import { DraftContext } from "../DraftContext";
// import '../_styles/Nav.css';

// const Nav = () => {
//   const { values, setters } = useContext(DraftContext);
//   let currentYear = new Date().getFullYear();
//   let arr = [];
//   for (let i = currentYear; i > 1962; i--) {
//     arr.push(i);
//   }

//   let teams = [
//     { name: 'None', team_id: 0},
//     { name: 'Anaheim Ducks', team_id: 24},
//     { name: 'Arizona Coyotes', team_id: 53},
//     { name: 'Boston Bruins', team_id: 6},
//     { name: 'Buffalo Sabres', team_id: 7},
//     { name: 'Calgary Flames', team_id: 20},
//     { name: 'Carolina Hurricanes', team_id: 12},
//     { name: 'Chicago Blackhawks', team_id: 16},
//     { name: 'Colorado Avalanche', team_id: 21},
//     { name: 'Columbus Blue Jackets', team_id: 29},
//     { name: 'Dallas Stars', team_id: 25},
//     { name: 'Detroit Red Wings', team_id: 17},
//     { name: 'Edmonton Oilers', team_id: 22},
//     { name: 'Florida Panthers', team_id: 13},
//     { name: 'Los Angeles Kings', team_id: 26},
//     { name: 'Minnesota Wild', team_id: 30},
//     { name: 'Montreal Canadiens', team_id: 8},
//     { name: 'Nashville Predators', team_id: 18},
//     { name: 'New Jersey Devils', team_id: 1},
//     { name: 'New York Islanders', team_id: 2},
//     { name: 'New York Rangers', team_id: 3},
//     { name: 'Ottawa Senators', team_id: 9},
//     { name: 'Philadelphia Flyers', team_id: 4},
//     { name: 'Pittsburgh Penguins', team_id: 5},
//     { name: 'San Jose Sharks', team_id: 28},
//     { name: 'Seattle Kraken', team_id: 55},
//     { name: 'St Louis Blues', team_id: 19},
//     { name: 'Tampa Bay Lightning', team_id: 14},
//     { name: 'Toronto Maple Leafs', team_id: 10},
//     { name: 'Vancouver Canucks', team_id: 23},
//     { name: 'Vegas Golden Knights', team_id: 54},
//     { name: 'Washington Capitals', team_id: 15},
//     { name: 'Winnipeg Jets', team_id : 52}
//   ]

//   let teamOptions = teams.map(team => ({value: team.team_id, label: team.name}));

//   let options = arr.map((item) => ({ value: item, label: item }))

//   useEffect(() => {
//     fetch(`https://statsapi.web.nhl.com/api/v1/draft/${values.draftYear}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setters.setDraft(data.drafts[0].rounds);
//       })
//   }, [ values.draftYear ]);

//   let handleChange = (e) => {
//     setters.setDraftYear(e.value)
//   }

//   const customStyles = {
//     option: (provided, state) => ({
//       ...provided,
//       borderBottom: '1px solid gray',
//       color: state.isSelected ? 'white' : 'black',
//       padding: 10,
//       width: 200
//     }),
//     a: {
//       width: 200,
//     },
//     control: (provided) => ({
//       ...provided,
//       margin: "0px"

//     }),
//     menu: (styles) => ({
//       ...styles,
//       margin: "0px",
//       width: 200,
//     }),
//     container: (styles) => ({
//       ...styles,
//       width: 200,
//     }),
//     singleValue: (provided, state) => {
//       const opacity = state.isDisabled ? 0.5 : 1;
//       const transition = 'opacity 300ms';
//       return { ...provided, opacity, transition };
//     }
//   }

//   return (
//     <>
//       <h1 className="title">Welcome to the {values.draftYear} NHL Draft</h1>
//       <div className="select">
//         <Select
//           styles={customStyles}
//           placeholder='Select Draft Year...'
//           onChange={handleChange}
//           options={options}
//         />
//         <Select
//           styles={customStyles}
//           placeholder='Select Team...'
//           onChange={(e) => {setters.setTeamName(e.label)}}
//           options={teamOptions}
//         />

//       </div>
//     </>
//   );
// }

// export default Nav;

import React, { useContext } from "react";
import { DraftContext } from "../DraftContext";
import { Select, createStyles } from "@mantine/core";
import "../_styles/Nav.css";

const Nav = () => {
	const { values, setters } = useContext(DraftContext);
	let currentYear = new Date().getFullYear();
	let yearArr = [];

	for (let i = currentYear; i > 1962; i--) {
		yearArr.push(i);
	}

	let teams = [
		{ name: "Anaheim Ducks", team_id: 24 },
		{ name: "Arizona Coyotes", team_id: 53 },
		{ name: "Boston Bruins", team_id: 6 },
		{ name: "Buffalo Sabres", team_id: 7 },
		{ name: "Calgary Flames", team_id: 20 },
		{ name: "Carolina Hurricanes", team_id: 12 },
		{ name: "Chicago Blackhawks", team_id: 16 },
		{ name: "Colorado Avalanche", team_id: 21 },
		{ name: "Columbus Blue Jackets", team_id: 29 },
		{ name: "Dallas Stars", team_id: 25 },
		{ name: "Detroit Red Wings", team_id: 17 },
		{ name: "Edmonton Oilers", team_id: 22 },
		{ name: "Florida Panthers", team_id: 13 },
		{ name: "Los Angeles Kings", team_id: 26 },
		{ name: "Minnesota Wild", team_id: 30 },
		{ name: "Montréal Canadiens", team_id: 8 },
		{ name: "Nashville Predators", team_id: 18 },
		{ name: "New Jersey Devils", team_id: 1 },
		{ name: "New York Islanders", team_id: 2 },
		{ name: "New York Rangers", team_id: 3 },
		{ name: "Ottawa Senators", team_id: 9 },
		{ name: "Philadelphia Flyers", team_id: 4 },
		{ name: "Pittsburgh Penguins", team_id: 5 },
		{ name: "San Jose Sharks", team_id: 28 },
		{ name: "Seattle Kraken", team_id: 55 },
		{ name: "St Louis Blues", team_id: 19 },
		{ name: "Tampa Bay Lightning", team_id: 14 },
		{ name: "Toronto Maple Leafs", team_id: 10 },
		{ name: "Vancouver Canucks", team_id: 23 },
		{ name: "Vegas Golden Knights", team_id: 54 },
		{ name: "Washington Capitals", team_id: 15 },
		{ name: "Winnipeg Jets", team_id: 52 }
	];

	// let teamOptions = teams.map((team) => ({
	// 	value: team.name,
	// 	label: team.name
	// }));

	// let options = yearArr.map((item) => ({ value: item, label: item }));

	const useStyles = createStyles((theme) => ({
		root: {
			// backgroundColor: "#3c6e71",
			border: 0,
			padding: 20,
			borderRadius: 6,
			marginTop: 5,
			maxWidth: 400

			// "&:hover": {
			// 	backgroundColor: theme.fn.darken("#3c6e71", 0.05)
			// }
		},
		label: {
			color: "white"
		}
	}));

	const { classes } = useStyles();

	return (
		<>
			<h1 className=" title">Welcome to the {values.draftYear} NHL Draft</h1>
			<div className="select-container">
				<Select
					styles={{ root: classes.root, label: classes.label }}
					clearable
					searchable
					placeholder="Select Draft Year..."
					onChange={(e) => {
						console.log(e);
						if (e !== null) {
							setters.setDraftYear(e);
						}
					}}
					data={yearArr.map((year) => year.toString())}
					transition="scale-y"
					transitionDuration={220}
					transitionTimingFunction="ease"
				/>
				<Select
					styles={{ root: classes.root, label: classes.label }}
					clearable
					searchable
					placeholder="Select Team..."
					onChange={(e) => {
						console.log(e);

						setters.setTeamName(e);
					}}
					data={teams.map((team) => team.name)}
					transition="scale-y"
					transitionDuration={220}
					transitionTimingFunction="ease"
				/>
			</div>
		</>
	);
};

export default Nav;
