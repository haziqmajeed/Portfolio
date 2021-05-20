import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import userService from '../services/Userservice';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
 
  export default function SingleStudent({student, onDelete, classCode}) {
    const classes = useStyles();
    
    const rows = [
        createData(student.name, student.email, student.status, 24, <Button variant="contained" color="secondary" onClick={(e)=>{
            userService.FindStudentAndDelete(student.email,classCode).then((data)=>{
                console.log(data);
                onDelete();
            }).catch((err)=>{
                console.log(err);
            })
        }}>
        Remove
      </Button>),
        
      ];
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }