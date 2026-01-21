import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="flex">
      <Toaster position="top-right" richColors />
      <Sidebar />
      <Tasks />
    </div>
  );
}
