import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <ReactQuill
      className="add-product-modal-textEditor"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
};

export { QuillEditor };
