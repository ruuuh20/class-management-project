import React, { Component } from 'react';
import { post } from 'axios'

export default class NewStudent extends Component {

    state = {
       
        userName: '',
        grade: '',
        gender: '',
       
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
       
        })
        
    }

    // handleFileChange = (e) => {
    //     this.setState({
    //         file: e.target.files[0],
    //         fileName: e.target.value
    //     })
    // }

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

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Add New Student</h1>
                
                    Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br></br>
                    Grade: <input type="text" name="grade" value={this.state.grade} onChange={this.handleValueChange} /> <br></br>
                    Gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                    <button type="submit">Add</button>

                </form>
                
            </div>
        )
    }
}
