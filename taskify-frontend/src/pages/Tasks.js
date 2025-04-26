import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setisAdding] = useState(false);
  const [newTask, setNewTask] = useState({ taskName: '', allottedTime: '', priority: '', status: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dailyTasks/tasks', { withCredentials: true });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

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
      const response = await axios.post('http://localhost:5000/api/dailyTasks/add', newTask, { withCredentials: true });
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
      const response = await axios.put(`http://localhost:5000/api/dailyTasks/edit/${editingTaskId}`, editedTask, { withCredentials: true });
      setTasks(tasks.map((t) => (t._id === editingTaskId ? response.data : t)));
      setEditingTaskId(null);
      setEditedTask({});
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const addNewRow = () => {
    setisAdding(true);
  };

  const deleteTask = async (task_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/dailyTasks/delete/${task_id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== task_id));
    } catch (error) {
      console.error('Error while deleting the task', error);
    }
  };

  return (
    <div>
      <p style={{ fontWeight: 'bold', color: '#10374A' ,padding: '20px',fontSize:'1.8rem'}}>Welcome to Taskify</p>


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#165668', color: '#fff' }}>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Task Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Allotted Time</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Priority</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Status</TableCell>
              <TableCell style={{ fontWeight: 'bold', color: '#fff' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id} style={{ backgroundColor: '#f9f9f9' }}>
                {editingTaskId === task._id ? (
                  <>
                    <TableCell>
                      <TextField name="taskName" value={editedTask.taskName} onChange={handleEditChange} fullWidth />
                    </TableCell>
                    <TableCell>
                      <TextField name="allottedTime" value={editedTask.allottedTime} onChange={handleEditChange} fullWidth />
                    </TableCell>
                    <TableCell>
                      <select name="priority" value={editedTask.priority} onChange={handleEditChange} style={selectStyle}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <select name="status" value={editedTask.status} onChange={handleEditChange} style={selectStyle}>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={saveEditedTask} style={{ backgroundColor: '#165668' }}>
                        Save
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{task.taskName}</TableCell>
                    <TableCell>{task.allottedTime}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="info" onClick={() => startEditing(task)} style={{ backgroundColor: '#165668' }} >Edit</Button>
                      <Button variant="contained" color="error" onClick={() => deleteTask(task._id)}>Delete</Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
            {isAdding && (
              <TableRow>
                <TableCell>
                  <TextField name="taskName" value={newTask.taskName} onChange={handleInputChange} fullWidth placeholder="Enter task name" />
                </TableCell>
                <TableCell>
                  <TextField name="allottedTime" value={newTask.allottedTime} onChange={handleInputChange} fullWidth placeholder="Enter allotted time" />
                </TableCell>
                <TableCell>
                  <select name="priority" value={newTask.priority} onChange={handleInputChange} style={selectStyle}>
                    <option value="" disabled>Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </TableCell>
                <TableCell>
                  <select name="status" value={newTask.status} onChange={handleInputChange} style={selectStyle}>
                    <option value="" disabled>Select Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={saveTask} style={{ backgroundColor: '#165668' }}>Save</Button>
                </TableCell>
              </TableRow>
            )}
            {!isAdding && editingTaskId === null && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Button variant="contained" onClick={addNewRow} style={{ backgroundColor: '#165668' }}>Add Task</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const selectStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
};

export default Tasks;
