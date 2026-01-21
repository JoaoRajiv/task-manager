import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";

export default function AddTaskDialog({ isOpen, handleClose }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-brand-dark-blue">
          Adicionar nova tarefa
        </h2>
        <p className="mb-4 mt-1 text-sm text-brand-text-gray">
          Insira as informações abaixo
        </p>
        <div className="flex w-[336px] flex-col space-y-4">
          <Input id="title" label="Título" placeholder="Título da tarefa" />
          <Input id="time" label="Horário" placeholder="Horário" />
          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="large"
              className="w-full"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
