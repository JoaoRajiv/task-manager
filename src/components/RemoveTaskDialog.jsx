import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./RemoveTaskDialog.css";
import Button from "./Button";

export default function RemoveTaskDialog({
  isOpen,
  handleClose,
  handleDeleteAllTasks,
}) {
  const nodeRef = useRef();

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={200}
      classNames="remove-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            <div
              className="flex flex-col rounded-xl bg-white p-5 text-center shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Remover todas as tarefas?
              </h2>
              <p className="mb-6 mt-1 text-sm text-brand-danger">
                Essa ação não pode ser desfeita.
              </p>
              <div className="flex w-full gap-3">
                <Button size="large" className="w-full" onClick={handleClose}>
                  Voltar
                </Button>
                <Button
                  size="large"
                  className="w-full"
                  color="danger"
                  onClick={() => {
                    handleDeleteAllTasks();
                  }}
                >
                  Apagar
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
}

RemoveTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
