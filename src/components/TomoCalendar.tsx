import React, { useCallback } from 'react'

import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Sidebar from './Sidebar';

const TomoCalendar:React.FC<{
  events: EventInput[];
  currentEvents: EventApi[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventApi[]>>;
}> = ({events, currentEvents, setCurrentEvents }) => {

  const handleEvents = useCallback((event: EventApi[]) => {
    // console.log("events:", events);  // 確認用
    setCurrentEvents(event);
  }, []);

  const handleDateSelect = useCallback(async (selectInfo: DateSelectArg) => {
    let title = prompt("イベントのタイトルを入力してください")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    const userId = localStorage.getItem('userId');
    if (title) {
      let docRef = null; 
      const eventToAdd = {
        userId: userId,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      try {
        
        // Add the event data to Firestore
        docRef = await addDoc(collection(db, 'list'), eventToAdd);
        console.log("Document written with ID: ", docRef.id);
  
        calendarApi.addEvent({
          id: docRef.id,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }, []);

  const handleEventClick = useCallback( async(clickInfo: EventClickArg) => {
    if (
      window.confirm(`このイベント「${clickInfo.event.title}」を削除しますか`)
    ) {
      clickInfo.event.remove();
      try {
        // Remove event data from Firestor
        await deleteDoc(doc(db, 'list', clickInfo.event.id));
        console.log(`Document with ID ${clickInfo.event.id} deleted`);
        console.log(clickInfo.event.id)
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  }, []);

  return (
    <div className="flex min-h-full font-arial font-helvetica-neue font-helvetica font-sans text-base">
        <Sidebar currentEvents={currentEvents} />
      <div className="flex-grow p-12 m-20">
        <FullCalendar
           plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
           headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay, listMonth",
          }}
           initialView="dayGridMonth"
           locales={allLocales}
           locale="ja"
          selectable={true}
          select={handleDateSelect}
          eventsSet={handleEvents}
          editable={true}
          eventClick={handleEventClick}
          events={events}
          handleWindowResize={true}
        />
      </div>
    </div>
  )
}

export default TomoCalendar