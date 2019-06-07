import React, { Component } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})


export default class NewStudent extends Component {

    state = {
       
        userName: '',
        grade: '',
        gender: '',
        open: false
       
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("submittttttttttttttttt")
        this.addStudent()
            .then((response) => {
                console.log("hello")
                console.log(response.data)
                this.props.stateRefresh();
            })
        this.setState({
        
            userName: '',
            grade: '',
            gender: '',
            open: false
       
        })
        
    }

   

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState) 
    }

    addStudent = () => {
        const url = '/api/students';
        const formData = new FormData();
        
        formData.append('name', this.state.userName)
        formData.append('grade', this.state.grade)
        formData.append('gender', this.state.gender);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            userName: '',
            grade: '',
            gender: '',
            
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Add Student</Button>
                <Dialog open={this.state.open} oncClose={this.handleClose}>
                    <DialogTitle>Add student</DialogTitle>
                    <DialogContent>
                        <TextField label="name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br></br>
                        <TextField label="grade" type="text" name="grade" value={this.state.grade} onChange={this.handleValueChange} /> <br></br>
                        <TextField label="gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Add</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>Close</Button>
                    </DialogActions>

                </Dialog>
            </div>
            /*
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Add New Student</h1>
                
                    Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br></br>
                    Grade: <input type="text" name="grade" value={this.state.grade} onChange={this.handleValueChange} /> <br></br>
                    Gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                    <button type="submit">Add</button>

                </form>
                
            </div>
            */
        )
    }
}
