import React from 'react'
import TomoCalendar from './TomoCalendar'
import { EventApi, EventInput } from "@fullcalendar/core";


const Home: React.FC<
{  events: EventInput[];
  currentEvents: EventApi[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventApi[]>>;

}> = ({events, currentEvents, setCurrentEvents }) => {
  return (
   <>
   <TomoCalendar 
     events={events}
     currentEvents={currentEvents}
     setCurrentEvents={setCurrentEvents} 
   />
   </>
  )
}

export default Home