import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import CalendarView from '../components/CalenderView';
import ReminderModal from '../components/ReminderModal';

const Remainder = () => {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    fetchAllReminders();
  }, []);

  const fetchAllReminders = async () => {
    const res = await axios.get('http://localhost:5000/api/reminder/getAll',{withCredentials:true}); // get all or filtered by month
    console.log(res.data.reminders);
    setReminders(res.data.reminders);
  };

  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
    setSelectedReminder(null);
    setModalOpen(true);
  };

  const handleEventClick = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/reminder/show/${id}`,{withCredentials:true});
    setSelectedReminder(res.data);
    console.log(res.data);
    console.log("data.remm",res.data.dueDate);
    setSelectedDate(res.data.dueDate);
    setModalOpen(true);
  };

  const handleSave = async (reminderData) => {
    if (selectedReminder) {
      await axios.put(`http://localhost:5000/api/reminder/edit/${selectedReminder._id}`, reminderData,{withCredentials:true});
    } else {
      await axios.post('http://localhost:5000/api/reminder/add', { ...reminderData, dueDate: selectedDate },{withCredentials:true});
    }
    setModalOpen(false);
    fetchAllReminders();
  };

  return (
    <>
      <CalendarView
        reminders={reminders}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
      <ReminderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate}
        existingReminder={selectedReminder}
        onSave={handleSave}
      />
    </>
  );
}

export default Remainder
// import React, { useEffect, useState } from 'react';
// import Calendar from '../components/CalenderView';
//  import ReminderModal from '../components/ReminderModal';
//  import axios from "axios";

// const Remainder = () => {
//   const [reminders, setReminders] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedReminder, setSelectedReminder] = useState(null); // For edit

//   const fetchAllReminders = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/reminder/getAll', { withCredentials: true });
//       setReminders(res.data.reminders);
//     } catch (err) {
//       console.error('Error fetching reminders:', err);
//     }
//   };

//   useEffect(() => {
//     fetchAllReminders();
//   }, []);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setSelectedReminder(null); // new reminder
//     setModalOpen(true);
//   };

//   const handleEventClick = (reminder) => {
//     setSelectedReminder(reminder);
//     setSelectedDate(reminder.dueDate);
//     setModalOpen(true);
//   };

//   const handleSaveReminder = async (reminder) => {
//     try {
//       if (selectedReminder) {
//         await axios.put(`http://localhost:5000/api/reminder/edit/${selectedReminder._id}`, reminder, {
//           withCredentials: true,
//         });
//       } else {
//         await axios.post('http://localhost:5000/api/reminder/add', reminder, {
//           withCredentials: true,
//         });
//       }
//       fetchAllReminders();
//       setModalOpen(false);
//     } catch (err) {
//       console.error('Error saving reminder:', err);
//     }
//   };

//   const handleDeleteReminder = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/reminder/delete/${selectedReminder._id}`, {
//         withCredentials: true,
//       });
//       fetchAllReminders();
//       setModalOpen(false);
//     } catch (err) {
//       console.error('Error deleting reminder:', err);
//     }
//   };

//   return (
//     <div>
//       <h1>Reminder Calendar</h1>
//       <Calendar onClickDay={handleDateClick} />

//       <div>
//         <h3>Reminders</h3>
//         {reminders.data.reminders.map((reminder) => (
//           <div key={reminder._id} onClick={() => handleEventClick(reminder)}>
//             {reminder.title} - {new Date(reminder.dueDate).toDateString()}
//           </div>
//         ))}
//       </div>

//       <ReminderModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSave={handleSaveReminder}
//         onDelete={handleDeleteReminder}
//         selectedDate={selectedDate}
//         existingReminder={selectedReminder}
//       />
//     </div>
//   );
// };

// export default Remainder;
