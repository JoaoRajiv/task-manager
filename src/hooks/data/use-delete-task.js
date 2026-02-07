import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";

export default function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationsKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(taskQueriesKeys.getAll, (oldTasks) =>
        oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id),
      );
    },
  });
}
