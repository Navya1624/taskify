// // ReminderModal.js
// import React, { useState, useEffect } from 'react';
// import { Modal, Box, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

// const ReminderModal = ({ open, onClose, onSave, selectedDate, existingReminder,onDelete }) => {
//   const [title, setTitle] = useState('');
//   const [dueTime, setDueTime] = useState('');
//   const [completionStatus, setCompletionStatus] = useState(false);

//   useEffect(() => {
//     if (existingReminder) {
//       setTitle(existingReminder.title);
//       setDueTime(existingReminder.dueTime || '');
//       setCompletionStatus(existingReminder.completionStatus);
//     } else {
//       setTitle('');
//       setDueTime('');
//       setCompletionStatus(false);
//     }
//   }, [existingReminder]);

//   const handleSave = () => {
//     const reminder = {
//       title,
//       dueDate: selectedDate,
//       dueTime,
//       completionStatus
//     };
//     onSave(reminder);
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{
//         backgroundColor: 'white',
//         padding: 4,
//         borderRadius: 2,
//         width: 400,
//         margin: '10% auto'
//       }}>
//         <h2>{existingReminder ? 'Edit' : 'Add'} Reminder</h2>
//         <TextField
//           fullWidth
//           label="Title"
//           margin="normal"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         />
//         <TextField
//           fullWidth
//           label="Due Time"
//           type="time"
//           margin="normal"
//           value={dueTime}
//           onChange={e => setDueTime(e.target.value)}
//         />
//         <FormControlLabel
//           control={<Checkbox checked={completionStatus} onChange={e => setCompletionStatus(e.target.checked)} />}
//           label="Completed"
//         />
//         <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
//       </Box>
//     </Modal>
//   );
// };

// export default ReminderModal;
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const ReminderModal = ({ open, onClose, selectedDate, existingReminder, onSave }) => {
  const [title, setTitle] = useState('');
  const [remindersForDate, setRemindersForDate] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);

  useEffect(() => {
    if (existingReminder) {
      setTitle(existingReminder.reminder.title);
      setEditingReminder(existingReminder.reminder);
      setRemindersForDate([]);
    } else if (selectedDate) {
      fetchRemindersByDate();
      setEditingReminder(null);
      setTitle('');
    }
  }, [existingReminder, selectedDate]);

  const fetchRemindersByDate = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reminder/by-date/${selectedDate}`, {
        withCredentials: true
      });
      setRemindersForDate(res.data.reminders);
    } catch (err) {
      console.error("Error fetching reminders for date", err);
    }
  };

  const handleSubmit = async () => {
    const reminderData = {
      title,
      dueDate: selectedDate,
      dueTime: '', // Optional: Add support for dueTime
    };

    if (editingReminder) {
      await axios.put(`http://localhost:5000/api/reminder/edit/${editingReminder._id}`, reminderData, {
        withCredentials: true
      });
    } else {
      await axios.post(`http://localhost:5000/api/reminder/add`, reminderData, {
        withCredentials: true
      });
    }

    setTitle('');
    setEditingReminder(null);
    fetchRemindersByDate();
    onSave(reminderData);
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setTitle(reminder.title);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/reminder/delete/${id}`, {
      withCredentials: true
    });
    fetchRemindersByDate();
  };

  const handleClose = () => {
    setTitle('');
    setEditingReminder(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, margin: '100px auto', p: 3, bgcolor: 'white', borderRadius: 2 }}>
        <Typography variant="h6" mb={2}>
          {editingReminder ? 'Edit Reminder' : 'Add Reminder'} for {selectedDate}
        </Typography>

        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Reminder title"
          margin="normal"
        />

        <Button variant="contained" onClick={handleSubmit} fullWidth>
          {editingReminder ? 'Update' : 'Add'}
        </Button>

        {!existingReminder && remindersForDate.length > 0 && (
          <>
            <Typography variant="subtitle1" mt={3}>
              Existing Reminders:
            </Typography>
            <List>
              {remindersForDate.map((rem) => (
                <ListItem
                  key={rem._id}
                  secondaryAction={
                    <>
                      <IconButton edge="end" onClick={() => handleEdit(rem)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDelete(rem._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  {rem.title}
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReminderModal;

