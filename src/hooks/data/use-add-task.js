import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskMutationsKeys } from "../../keys/mutations";
import { taskQueriesKeys } from "../../keys/queries";

export default function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationsKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post("/tasks", task);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTasks) => [
        ...oldTasks,
        createdTask,
      ]);
    },
  });
}
