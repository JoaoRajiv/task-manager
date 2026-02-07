import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { taskQueriesKeys } from "../../keys/queries";

export default function useGetTasks() {
  return useQuery({
    queryKey: taskQueriesKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get("http://localhost:3000/tasks");
      return tasks;
    },
  });
}
