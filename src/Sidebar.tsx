import { EventApi, formatDate } from "@fullcalendar/core";

interface Props {
  currentEvents: EventApi[];
}

const renderSidebarEvent = (event: EventApi) => (
  <li key={event.id}>
    <b>
      {formatDate(event.start!, {
        year: "numeric",
        month: "short",
        day: "numeric",
        locale: "ja",
      })}
    </b>
    <i>{event.title}</i>
  </li>
);

const Sidebar: React.FC<Props> = ({ currentEvents }) => (
  <div className="demo-app-sidebar">
    <div className="demo-app-sidebar-section">
      <h2>操作方法</h2>
      <ul>
        <li>日付を選んでイベント作成</li>
        <li>ドラッグ&amp;ドロップでイベントの長さ変更</li>
        <li>クリックでイベント削除</li>
      </ul>
    </div>
    
    <div className="demo-app-sidebar-section">
      <h2>予定一覧({currentEvents.length})</h2>
      <ul>{currentEvents.map(renderSidebarEvent)}</ul>
    </div>
  </div>
);

export default Sidebar;
