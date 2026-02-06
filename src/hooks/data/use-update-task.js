import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        newTask,
        {
          title: newTask.title,
          description: newTask.description,
          time: newTask.time,
        },
      );
      queryClient.setQueryData(["tasks"], (oldTask) => {
        if (!oldTask) return;
        return oldTask.map((oldTask) => {
          oldTask.id === taskId ? updatedTask : oldTask;
        });
      });
    },
  });
}
