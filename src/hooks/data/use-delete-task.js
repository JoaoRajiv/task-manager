import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    matationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
      const deletedTask = await response.json();
      return deletedTask;
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id),
      );
    },
  });
}
