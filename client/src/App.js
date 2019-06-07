import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Student from './components/Student';
import NewStudent from './components/NewStudent';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  }, 
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})
// const students = {
//   'id': 1,
//   'image': 'https://placeimg.com/64/64/any',
//   'name': 'Joe'
// }

const callApi = async () => {
  const response = await fetch('/api/students');
  const body = await response.json();
  console.log(body)
  return body;
}

const App = (props) => {
  const [students, setStudent] = useState("");
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const timer = setInterval(progress, 20)
    callApi()
    .then(res => setStudent( res ))
    .catch(error => console.log(error))
  }, [])

  const stateRefresh = () => {
    setStudent("")
    setCompleted(0)
    callApi()
      .then(res => setStudent(res))
      .catch(error => console.log(error))
  }


  const { classes } = props

  const progress = () => {
    setCompleted( completed >= 100 ? 0 : completed + 1)
  }
  return (
    <React.Fragment>
      <Paper className={styles({ spacing: { unit: 1 } }).root}>
      <Table>
        <TableHead>

        <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Grade</TableCell>
        <TableCell>Gender</TableCell>
       
        </TableRow>

        </TableHead>
        <TableBody>
            {students ? students.map(s => { return <Student key={s.id} id={s.id} name={s.name} gender={s.gender} grade={s.grade} /> }) : 
          <TableRow>
            <TableCell colSpan="6" align="center">
                  <CircularProgress className={styles({ spacing: { unit: 1 } }).progress}variant="determinate" value={completed}/>

            </TableCell>
          </TableRow>}

        </TableBody>
      </Table>
      </Paper>
      <NewStudent stateRefresh={stateRefresh} />
    </React.Fragment>
  );
}

export default App;
