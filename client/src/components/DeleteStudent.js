import React, { Component } from 'react'

export default class DeleteStudent extends Component {

    deleteStudent(id) {
        const url = '/api/students/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh()
    }
    render() {
        return (
            <div>
                <button onClick={(e) => {this.deleteStudent(this.props.id)}}>Delete</button>
            </div>
        )
    }
}
