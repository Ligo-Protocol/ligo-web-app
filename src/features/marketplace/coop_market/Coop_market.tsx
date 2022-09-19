import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";

interface coop {
  name: string;
  totalmembers: number;
  boardmembers: number;
  location: string;
  governance: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const originalRows: coop[] = [
  {
    name: "NY EV Cooperatives",
    totalmembers: 200,
    boardmembers: 26.0,
    location: "New York",
    governance: "Aaragon DAO"
  },
  {
    name: "New Jersey Heavy Vechicle Cooperatives",
    totalmembers: 300,
    boardmembers: 25.0,
    location: "New Jersey",
    governance: "Snapshot DAO"
  },
  {
    name: "Alabama COOP",
    totalmembers: 400,
    boardmembers: 36.0,
    location: "Alabama",
    governance: "Aaragon DAO"
  },
  {
    name: "Cali Airport rental Cooperatives",
    totalmembers: 500,
    boardmembers: 40.0,
    location: "California",
    governance: "Snapshot DAO"
  }
];

export default function Coopmarket() {
  const [rows, setRows] = useState<coop[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const classes = useStyles();

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <><h1>COOP marketplace</h1>
    <br/>
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><strong>COOP names</strong></TableCell>
                <TableCell align="right"><strong>Total members</strong></TableCell>
                <TableCell align="right"><strong>Board members</strong></TableCell>
                <TableCell align="right"><strong>Location</strong></TableCell>
                <TableCell align="right"><strong>Governance</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.totalmembers}</TableCell>
                  <TableCell align="right">{row.boardmembers}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">{row.governance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
