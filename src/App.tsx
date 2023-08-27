import { EventApi } from "@fullcalendar/core";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css"
import MenuBar from "./components/Menubar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MemberLogin from "./components/MemberLogin";
import Signup from "./components/Signup";
import Home from "./components/Home";

interface EventData {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

function App() {
  const [userId, setUserId] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
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
    <Router>
    <MenuBar />
        {/* <TomoCalendar 
        events={events}
        currentEvents={currentEvents}
        setCurrentEvents={setCurrentEvents} 
    /> */}
      <Routes>
      <Route path='/login' element={<MemberLogin 
       setUserId={setUserId}
       setIsAuthenticated={setIsAuthenticated}
      
      />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/' element={<Home 
        events={events}
        currentEvents={currentEvents}
        setCurrentEvents={setCurrentEvents} 
      />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;