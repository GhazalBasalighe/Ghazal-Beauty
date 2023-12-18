// useModal.js
import { useState, useEffect } from "react";

export function useModal() {
  const [modalStates, setModalStates] = useState({});

  const openModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModalStates((prev) => ({ ...prev, [modalName]: false }));
  };

  const isModalOpen = (modalName) => modalStates[modalName] || false;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        //close the currently open modal
        for (const modalName in modalStates) {
          if (modalStates[modalName]) {
            closeModal(modalName);
          }
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [modalStates, closeModal]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
