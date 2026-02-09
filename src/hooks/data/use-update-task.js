import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";
import { taskMutationsKeys } from "../../keys/mutations";

export default function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationsKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      });
      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTask) => {
        if (!oldTask) return [];
        return oldTask.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        });
      });
      queryClient.setQueryData(taskQueriesKeys.getOne(taskId), updatedTask);
    },
  });
}
