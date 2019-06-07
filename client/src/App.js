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
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  }, 
  paper: {
    marginLeft: 18,
    marginRight: 18,

  },
  
  progress: {
    margin: theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    display: 'none'
    
  },
  search: {
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
      // backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(1),
      // width: 'auto',
    // },
  },
  searchIcon: {
    // width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 7),
    // transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: 120,
    //   '&:focus': {
    //     width: 200,
    //   },
    // },
  },
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
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const timer = setInterval(progress, 20)
    callApi()
    .then(res => setStudent( res ))
    .catch(error => console.log(error))
  }, [])

  const stateRefresh = () => {
    setStudent("")
    setCompleted(0)
    setSearchKeyword('')
    callApi()
      .then(res => setStudent(res))
      .catch(error => console.log(error))
  }
  const handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setSearchKeyword(e.target.value)

  }


  const { classes } = props
  const cellList = ["No.", "Name", "Grade", "Gender", "Edit"]

  const progress = () => {
    setCompleted( completed >= 100 ? 0 : completed + 1)
  }

  const filteredComponents = data => {
    data = data.filter((c) => {
      return c.name.indexOf(searchKeyword) > -1
    })
    return data.map((c) => {
      return <Student stateRefresh={stateRefresh} key={c.id} id={c.id} name={c.name} gender={c.gender} grade={c.grade} />
    }
    )
  }
  return (
    <React.Fragment>
      <div className={styles({ spacing: { unit: 1 } }).root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={styles({ spacing: { unit: 1 } }).menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Class Management
          </Typography>
            <div>
              <div>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                
                inputProps={{ 'aria-label': 'Search' }}
                name="searchKeyword"
                value={searchKeyword}
                onChange={handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div>
        <NewStudent stateRefresh={stateRefresh} />
</div>
      <Paper >
      <Table>
        <TableHead>

        <TableRow>
          {cellList.map(c => {
            return <TableCell className="tableHead">{c}</TableCell>
          })}
       
        </TableRow>

        </TableHead>
        <TableBody>
            {students ? 
            filteredComponents(students) :
          
          <TableRow>
            <TableCell colSpan="6" align="center">
                  <CircularProgress className={styles({ spacing: { unit: 1 } }).progress}variant="determinate" value={completed}/>

            </TableCell>
          </TableRow>
        }

        </TableBody>
      </Table>
      </Paper>
    
     </div>
    </React.Fragment>
  );
}

export default App;
