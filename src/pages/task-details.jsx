import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index.js";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import TimeSelect from "../components/TimeSelect.jsx";
import { toast, Toaster } from "sonner";

export default function TaskDetailsPage() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [taskId]);

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    if (!title.trim()) {
      newErrors.push({ inputName: "title", message: "Título é obrigatório" });
    }
    if (!time.trim()) {
      newErrors.push({ inputName: "time", message: "Período é obrigatório" });
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "Descrição é obrigatória",
      });
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });
    if (!response.ok) {
      toast.error("Erro ao atualizar a tarefa!");
      return setSaveIsLoading(false);
    }
    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
    toast.success("Tarefa atualizada com sucesso!");
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description",
  );

  const handleDeleteTask = async () => {
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    navigate(-1);
    toast.success("Tarefa deletada com sucesso!");
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
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              label="Título"
              id="title"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
              disabled={saveIsLoading}
            />
          </div>
          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
              disabled={saveIsLoading}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              disabled={saveIsLoading}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
