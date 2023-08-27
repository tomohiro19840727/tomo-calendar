import { EventApi } from "@fullcalendar/core";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css"
import MenuBar from "./components/Menubar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MemberLogin from "./components/MemberLogin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import MemberLogout from "./components/MemberLogout";
import { useMediaQuery } from 'react-responsive';
import MobileMenuBar from "./components/MobileMenuBar";
import MobileHome from "./components/MobileHome";


interface EventData {
  userId: string,
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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   const fetchEventsFromFirestore = async () => {
  //     const q = query(collection(db, 'list'), where('userId', '==', userId));
  //     const data = await getDocs(q);
  //     // const querySnapshot = await getDocs(collection(db, "list"));
  //     // const fetchedEvents = querySnapshot.docs.map((doc) => ({
  //     //   ...doc.data(),
  //     //   id: doc.id,
  //     // })) as EventData[];
  //     setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) as EventData[];
  //   };
  //   fetchEventsFromFirestore();
  // }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchEventsFromFirestore = async () => {
      const q = query(collection(db, 'list'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const fetchedEvents: EventData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        title: doc.data().title,
        start: doc.data().start,
        end: doc.data().end,
        allDay: doc.data().allDay,
      }));
      setEvents(fetchedEvents);
    };
  
    fetchEventsFromFirestore();
  }, []);
  

  return (
    <>
    <Router>
    <div>
        {isMobile ? ( 
          <MobileMenuBar  />
          )  : 
          (
            <MenuBar  /> )}
      </div>
        
      <Routes>
      <Route path='/login' element={<MemberLogin 
       setUserId={setUserId}
       setIsAuthenticated={setIsAuthenticated}
      
      />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/logout' element={<MemberLogout
      setIsAuthenticated={setIsAuthenticated}
      />}/>

      <Route path='/' element={
       <div>
       {isMobile ? ( 
         <MobileHome  
         events={events}
         currentEvents={currentEvents}
         setCurrentEvents={setCurrentEvents}
         />
         )  : 
         (
          <Home 
          events={events}
          currentEvents={currentEvents}
          setCurrentEvents={setCurrentEvents} 
        /> )}
     </div>
       }/>

     


      </Routes>
    </Router>
    </>
  );
}

export default App;