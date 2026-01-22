import { createPortal } from "react-dom";
import Input from "./Input";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import "./AddTaskDialog.css";
import InputLabel from "./InputLabel";

export default function AddTaskDialog({ isOpen, handleClose }) {
  const nodeRef = useRef();
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={200}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
            onClick={handleClose}
          >
            <div
              className="rounded-xl bg-white p-5 text-center shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Adicionar nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                />
                <div className="flex flex-col gap-1 text-left">
                  <InputLabel htmlFor="time">Período do dia</InputLabel>
                  <select
                    id="time"
                    className="focus:border-brand-blue rounded-lg border border-solid border-brand-light-gray px-4 py-3 placeholder:text-sm placeholder:text-brand-text-gray focus:outline-brand-primary"
                  >
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="evening">Noite</option>
                  </select>
                </div>

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
        )}
      </div>
    </CSSTransition>
  );
}
