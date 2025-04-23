import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
import axios from 'axios';


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isAdding, setisAdding] = useState(false); // Track if a new row is being edited
    const [newTask, setNewTask] = useState({ taskName: '', allottedTime: '', priority: '', status: '' });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({});

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dailyTasks/tasks',{
                    withCredentials: true,
                  });
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    // Handle input changes in the editable row
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
      };

    const saveTask = async () => {
        try {
                const response = await axios.post('http://localhost:5000/api/dailyTasks/add', newTask,
                    {
                        withCredentials: true,
                      }
                );
            setTasks([...tasks, response.data]);
            setNewTask({ taskName: '', allottedTime: '', priority: '', status: '' });
            setisAdding(false);

        } catch (error) {
            console.error('Error saving task:', error);
        }
    };
    const startEditing = (task) => {
        setEditingTaskId(task._id);
        setEditedTask(task);
      };

      const saveEditedTask = async () => {
        try {
          const response = await axios.put(
            `http://localhost:5000/api/dailyTasks/edit/${editingTaskId}`,
            editedTask,
            { withCredentials: true }
          );
          setTasks(tasks.map((t) => (t._id === editingTaskId ? response.data : t)));
          setEditingTaskId(null);
          setEditedTask({});
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
    // Trigger new empty row for editing
    const addNewRow = () => {
        setisAdding(true);
    };

    const deleteTask = async( task_id) => {
        try{
            const response = await axios.delete(`http://localhost:5000/api/dailyTasks/delete/${task_id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== task_id));
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
                    {tasks.map((task) => (
              <TableRow key={task._id}>
                {editingTaskId === task._id ? (
                  <>
                    <TableCell>
                      <TextField
                        name="taskName"
                        value={editedTask.taskName}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="allottedTime"
                        value={editedTask.allottedTime}
                        onChange={handleEditChange}
                      />
                    </TableCell>
                    <TableCell>
                      <select
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleEditChange}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <select
                        name="status"
                        value={editedTask.status}
                        onChange={handleEditChange}
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={saveEditedTask}>
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) :(
                    <>
                      <TableCell>{task.taskName}</TableCell>
                      <TableCell>{task.allottedTime}</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="info" onClick={() => startEditing(task)}>
                          Edit
                        </Button>{' '}
                        <Button variant="contained" color="error" onClick={() => deleteTask(task._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
  

                        {isAdding && (
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

                        {!isAdding && editingTaskId === null &&(
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

