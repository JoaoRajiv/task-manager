import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTask(taskId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (newTask) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          time: newTask.time,
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar a tarefa");
      }
      const updatedTask = await response.json();
      queryClient.setQueryData(["tasks"], (oldTask) => {
        if (!oldTask) return;
        return oldTask.map((oldTask) => {
          oldTask.id === taskId ? updatedTask : oldTask;
        });
      });
    },
  });
}
