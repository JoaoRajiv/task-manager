import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";

export default function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    matationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id),
      );
    },
  });
}
