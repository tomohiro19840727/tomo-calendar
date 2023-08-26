// import FullCalendar, { EventApi } from "@fullcalendar/react";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventApi, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// import { INITIAL_EVENTS } from "./event-utils";
import { INITIAL_EVENTS, createEventId } from './event.utils'
import { useCallback, useState } from "react";
import Sidebar from "./Sidebar";

function App() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const handleWeekendsToggle = useCallback(
    () => setWeekendsVisible(!weekendsVisible),
    [weekendsVisible]
  );

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => {
    console.log("events:", events);  // 確認用
    setCurrentEvents(events);
  }, []);

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let title = prompt("イベントのタイトルを入力してください")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }, []);
  
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (
      window.confirm(`このイベント「${clickInfo.event.title}」を削除しますか`)
    ) {
      clickInfo.event.remove();
    }
  }, []);

  return (
    <div className="demo-app">
        <Sidebar
        toggleWeekends={handleWeekendsToggle}
        weekendsVisible={weekendsVisible}
        currentEvents={currentEvents}
      />
      <div className="demo-app-main">
        <FullCalendar
           plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
           headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay, listMonth",
          }}
           initialView="dayGridMonth"
           initialEvents={INITIAL_EVENTS}
           locales={allLocales}
           locale="ja"
          selectable={true}
          
          select={handleDateSelect}
          eventsSet={handleEvents}
          editable={true}
          eventClick={handleEventClick}
          selectMirror={true}
          dayMaxEvents={true}
          navLinks={true}
          businessHours={true}
          handleWindowResize={true}
          weekends={weekendsVisible}
        />
      </div>
    </div>
  );
}

export default App;