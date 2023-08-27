import React from 'react'
import { EventApi, EventInput } from "@fullcalendar/core";
import MobileTomoCalendar from './MobileTomoCalendar';


const MobileHome: React.FC<
{ 
   events: EventInput[];
  currentEvents: EventApi[];
  setCurrentEvents: React.Dispatch<React.SetStateAction<EventApi[]>>;

}> = ({events, currentEvents, setCurrentEvents }) => {
  return (
   <>
   <MobileTomoCalendar 
     events={events}
     currentEvents={currentEvents}
     setCurrentEvents={setCurrentEvents} 
   />
   </>
  )
}

export default MobileHome