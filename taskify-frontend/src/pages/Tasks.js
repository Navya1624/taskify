import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
const decoded = jwtDecode(token);
const userId = decoded.userId;

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Track if a new row is being edited
    const [newTask, setNewTask] = useState({ taskName: '', allottedTime: '', priority: '', status: '' });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dailyTasks/:');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    // Handle input changes in the editable row
    const handleInputChange = (e) => {
      console.log(e);
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };


    const saveTask = async () => {
        try {
            {
                const response = await axios.post('http://localhost:5000/api/dailyplanner/tasks', newTask);
                setTasks([...tasks, response.data]);
            }
            setNewTask({ taskName: '', allottedTime: '', priority: '', status: '' });
            setIsEditing(false);

        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    // Trigger new empty row for editing
    const addNewRow = () => {
        setIsEditing(true);
    };

    const editTask = async(task_id) => {
        setIsEditing(true);
        try {
            const change = await handleInputChange();
            saveTask(task_id);
        }catch(error){
            console.error('Error saving task:', error);
        }
    }

    const deleteTask = async( task_id) => {
        try{
            const response = await axios.delete(`http://localhost:5000/api/dailyplanner/tasks/${task_id}`);
            //setTasks(tasks.filter((task) => task._id !== id));
            console.log('Task deleted successfully:', response.data);
        }catch(error){
            console.error('Error while deleting the tasks',error);
        }
    };

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Name</TableCell>
                            <TableCell>Allotted Time</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{task.taskName}</TableCell>
                                <TableCell>{task.allottedTime}</TableCell>
                                <TableCell>{task.priority}</TableCell>
                                <TableCell>{task.status}</TableCell>

                                <TableCell>
                                    <Button variant="contained" color="info" onClick={() => editTask(task._id)} >
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => deleteTask(task._id)} >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {isEditing && (
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="taskName"
                                        value={newTask.taskName}
                                        onChange={handleInputChange}
                                        placeholder="Enter task name"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="allottedTime"
                                        value={newTask.allottedTime}
                                        onChange={handleInputChange}
                                        placeholder="Enter allotted time"
                                    />
                                </TableCell>
                                <TableCell>
                                    <select
                                        name="priority"
                                        value={newTask.priority}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>
                                            Select Priority
                                        </option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <select
                                        name="status"
                                        value={newTask.status}

                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>
                                            Select Status
                                        </option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={saveTask}>
                                        Save
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}

                        {!isEditing && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Button variant="contained" onClick={addNewRow}>
                                        Add
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Tasks;