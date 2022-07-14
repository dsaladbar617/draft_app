import * as React from 'react';
import { useContext } from 'react';
import { DraftContext } from '../DraftContext';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const NewTable = () => {
  let { values, setters } = useContext(DraftContext);

  const createData = (round, overAll, teamName, prospectName) => {
    return {
      round,
      overAll,
      teamName,
      prospectName,
      stats: {

      }
    }
  }

  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
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
  }


  Row.propTypes = {
    row: PropTypes.shape({
      round: PropTypes.number.isRequired,
      overAll: PropTypes.number.isRequired,
      teamName: PropTypes.string.isRequired,
      prospectName: PropTypes.string.isRequired,
      stats: PropTypes.object
    })
  }

  const rows = values.draft.map((draft) => {
    draft.picks.map((pick) => {
      createData(pick.round, pick.pickOverall, pick.team.name, pick.prospect.fullName)
    })
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Round</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Team Name</TableCell>
            <TableCell align="right">Prospect</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            // <Row key={row.name} row={row} />
          ))} */}
          {rows.forEach((row) => {
            console.log(row)
          }
            // <Row key={row.name} row={row} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NewTable;