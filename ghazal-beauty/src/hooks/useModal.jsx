import { useEffect, useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleEscKey);
    }
    // Remove event listener when the modal is closed
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen, closeModal]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
