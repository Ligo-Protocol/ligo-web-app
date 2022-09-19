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

interface privates {
  name: string;
  totalmembers: number;
  admins: number;
  location: string;
  usecase: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const originalRows: privates[] = [
  {
    name: "NY Airport rentals",
    totalmembers: 200,
    admins: 6.0,
    location: "New York",
    usecase: "Airport rentals"
  },
  {
    name: "New Jersey Heavy Vechicle Group",
    totalmembers: 300,
    admins: 5.0,
    location: "New Jersey",
    usecase: "Heavy Vehicles"
  },
  {
    name: "Alabama privates",
    totalmembers: 400,
    admins: 6.0,
    location: "Alabama",
    usecase: "EV only"
  },
  {
    name: "Cali Luxury rentals",
    totalmembers: 500,
    admins: 4.0,
    location: "California",
    usecase: "Luxury Cars only"
  }
];

export default function Privatemarket() {
  const [rows, setRows] = useState<privates[]>(originalRows);
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
    <><h1>Private marketplace</h1>
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
                <TableCell><strong>Privates names</strong></TableCell>
                <TableCell align="right"><strong>Total members</strong></TableCell>
                <TableCell align="right"><strong>Admins</strong></TableCell>
                <TableCell align="right"><strong>Location</strong></TableCell>
                <TableCell align="right"><strong>Use case</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.totalmembers}</TableCell>
                  <TableCell align="right">{row.admins}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">{row.usecase}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
