import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [taskId]);
  return (
    <div>
      <h1>Task Details Page</h1>
      <p>Task ID: {task?.title}</p>
      <p>Status: {task?.status}</p>
      <p>Time: {task?.time}</p>
    </div>
  );
}
