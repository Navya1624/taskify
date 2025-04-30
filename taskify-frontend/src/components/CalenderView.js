// CalendarView.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for date click

const CalendarView = ({ reminders, onDateClick, onEventClick }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={reminders.map(rem => ({
        title: rem.title,
        date: rem.dueDate,
        id: rem._id,
      }))}
      dateClick={(info) => onDateClick(info.dateStr)}
      eventClick={(info) => onEventClick(info.event.id)}
      height="auto"
    />
  );
};

export default CalendarView;
