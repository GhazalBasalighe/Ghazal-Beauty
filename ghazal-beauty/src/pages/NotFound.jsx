function NotFound() {
  return (
    <div className="grid place-items-center h-screen">
      <p className="font-bold text-xl">
        sorry , the page you're looking for does not exist
      </p>
      <img src="src/assets/notFound.svg" alt="not found" />
    </div>
  );
}

export default NotFound;
