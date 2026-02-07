import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";

export default function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationsKeys.update(taskId),
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await api.patch(
        `http://localhost:3000/tasks/${taskId}`,
        newTask,
        {
          title: newTask.title,
          description: newTask.description,
          time: newTask.time,
        },
      );
      queryClient.setQueryData(taskQueriesKeys.getAll(), (oldTask) => {
        if (!oldTask) return;
        return oldTask.map((task) => {
          task.id === taskId ? updatedTask : task;
        });
      });
      queryClient.setQueryData(taskQueriesKeys.getOne(taskId), updatedTask);
    },
  });
}
