import Sidebar from "../components/Sidebar.jsx";
import Tasks from "../components/Tasks.jsx";

export default function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
}
