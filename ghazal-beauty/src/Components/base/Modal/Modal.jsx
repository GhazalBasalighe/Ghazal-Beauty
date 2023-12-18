import { XCircle } from "@phosphor-icons/react";

export function Modal({ children, title, closeModal }) {
  return (
    // BackDrop
    <div style={{ fontFamily: "'Vazir', 'Poppins'" }}>
      <div
        className="fixed w-full top-0 left-0 bg-[#04040468] h-screen z-10"
        onClick={closeModal}
      ></div>
      <div className="fixed w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-20 bg-white p-5">
        {/* TITLE OF MODAL */}
        <div className="vertical-flex justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          {/* CLOSE BTN */}
          <XCircle
            className="text-purple-500 cursor-pointer"
            size={40}
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
