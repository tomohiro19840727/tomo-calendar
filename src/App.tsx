import { EventApi } from "@fullcalendar/core";


import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css"
import TomoCalendar from "./components/TomoCalendar";
import MenuBar from "./components/Menubar";

interface EventData {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

function App() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  
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


  return (
    <>
    <MenuBar />
    <TomoCalendar 
    events={events}
    currentEvents={currentEvents}
    setCurrentEvents={setCurrentEvents} 
    
    />
    </>
  );
}

export default App;