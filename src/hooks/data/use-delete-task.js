import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    matationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`,
      );
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id),
      );
    },
  });
}
