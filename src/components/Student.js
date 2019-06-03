import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default class Student extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell><img src={this.props.image} alt="profile img" /></TableCell>
            </TableRow>
        )
    }
}

class StudentProfile extends Component {
    render() {
        return 
    }
}
