import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteStudent from './DeleteStudent';


export default class Student extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.grade}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell><DeleteStudent stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
             
            </TableRow>
        )
    }
}

class StudentProfile extends Component {
    render() {
        return 
    }
}
