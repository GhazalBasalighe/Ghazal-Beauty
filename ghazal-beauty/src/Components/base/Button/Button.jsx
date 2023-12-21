export function Button({
  children,
  classes = "",
  onClick,
  type = "button",
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        "text-lg shadow-2xl bg-purple-500 text-white py-1 px-8 rounded-lg hover:bg-purple-600 hover:scale-110 duration-300" +
        classes
      }
    >
      {children}
    </button>
  );
}
