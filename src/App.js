import React from 'react';
import logo from './logo.svg';
import './App.css';
import Student from './components/Student';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }, 
  table: {
    minWidth: 1080
  }
})
const students = {
  'id': 1,
  'image': 'https://placeimg.com/64/64/any',
  'name': 'Joe'
}
const App = (props) => {

  const { classes } = props
  return (
    <React.Fragment>
      <Paper className={styles({ spacing: { unit: 1 } }).root}>
      <Table>
        <TableHead>

        <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Image</TableCell>
        </TableRow>

        </TableHead>
        <TableBody>
          <Student id={students.id} image={students.image} name={students.name} />

        </TableBody>
      </Table>
      </Paper>
    </React.Fragment>
  );
}

export default App;
