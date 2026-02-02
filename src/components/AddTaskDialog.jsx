import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./AddTaskDialog.css";
import TimeSelect from "./TimeSelect";
import Input from "./Input";
import Button from "./Button";
import { v4 } from "uuid";
import { LoaderIcon } from "../assets/icons";
import { useForm } from "react-hook-form";

export default function AddTaskDialog({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim() || "",
      time: data.time,
      status: "pending",
    };
    console.log(task);
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      return onSubmitError();
    }
    onSubmitSuccess(task);
    handleClose();
    reset({ title: "", description: "", time: "" });
  };

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
                  errorMessage={errors?.title?.message}
                  {...register("title", {
                    required: true,
                    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                    validate: (value) => {
                      if (value.trim().length === 0) {
                        return "Título não pode ser vazio";
                      }
                      return true;
                    },
                  })}
                  disabled={isSubmitting}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  {...register("description")}
                  disabled={isSubmitting}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  {...register("time", { required: true })}
                  disabled={isSubmitting}
                />

                <form
                  onSubmit={handleSubmit(handleSaveClick)}
                  className="flex gap-3"
                >
                  <Button
                    color="danger"
                    size="large"
                    className="w-full"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </form>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};
