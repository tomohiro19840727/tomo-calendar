// import FullCalendar, { EventApi } from "@fullcalendar/react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface EventData {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

function App() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEventsFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "list"));
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as EventData[];
      setEvents(fetchedEvents);
    };

    fetchEventsFromFirestore();
  }, []);

  console.log(events);

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((event: EventApi[]) => {
    // console.log("events:", events);  // 確認用
    setCurrentEvents(event);
  }, []);


  const handleDateSelect = useCallback(async (selectInfo: DateSelectArg) => {
    let title = prompt("イベントのタイトルを入力してください")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      let docRef = null; 
      const eventToAdd = {
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
        // Remove event data from Firestore
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
  );
}

export default App;