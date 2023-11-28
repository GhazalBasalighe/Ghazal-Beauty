import React, { useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";

export function TextEditor() {
  const ejInstance = useRef();
  const isReady = useRef(false);
  useEffect(() => {
    if (!isReady.current) {
      const editorConfig = {
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "نقل و قول...",
              captionPlaceholder: "از ...",
            },
          },
          link: {
            class: LinkTool,
          },
          onReady: () => {
            ejInstance.current = editor;
          },
        },
      };

      const editor = new EditorJS(editorConfig);
      isReady.current = true;
    }
  }, []);

  return (
    <>
      <div className="add-product-modal-textEditor" id="editorjs"></div>
    </>
  );
}
