import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "../assets/icons/index.js";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import TimeSelect from "../components/TimeSelect.jsx";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUpdateTask from "../hooks/data/use-update-task.js";
import useDeleteTask from "../hooks/data/use-delete-task.js";
import useGetTask from "../hooks/data/use-get-task.js";

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { data: task } = useGetTask(taskId, (task) => {
    reset(task);
  });

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa!");
      },
    });
  };

  const handleDeleteTask = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
        navigate(-1);
      },
      onError: () => {
        toast.error("Erro ao deletar a tarefa!");
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo  */}
        <div className="flex w-full justify-between">
          {/* Parte da esquerda  */}
          <div>
            <button
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
              onClick={handleBackClick}
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* Parte da direita  */}
          <Button
            className="h-fit self-end border border-brand-danger"
            color="danger"
            onClick={handleDeleteTask}
          >
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>
        {/* Dados da tarefa  */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                label="Título"
                id="title"
                {...register("title", {
                  required: "Título é obrigatório",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                  validate: (value) => {
                    if (value.trim().length === 0) {
                      return "Título não pode ser vazio";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                {...register("time", { required: "Período é obrigatório" })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description")}
                errorMessage={errors?.description?.message}
              />
            </div>
            {/* Botão de Salvar  */}
            <div className="flex w-full justify-end gap-3">
              <Button
                size="large"
                color="primary"
                type="submit"
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
              >
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
