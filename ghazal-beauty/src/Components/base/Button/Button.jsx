export function Button({ children }) {
  return (
    <button
      type="submit"
      className="text-lg shadow-2xl bg-purple-500 text-white self-center py-1 px-8 rounded-lg hover:bg-purple-600 hover:scale-110 duration-300"
    >
      {children}
    </button>
  );
}
