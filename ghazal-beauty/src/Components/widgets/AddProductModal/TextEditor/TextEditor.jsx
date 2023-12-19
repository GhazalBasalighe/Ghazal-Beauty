import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";

export function TextEditor({ onChange }) {
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
        onReady: {
          class: function OnReadyTool() {
            this.constructable = function () {
              return {
                render: () => {
                  // Your onReady logic here
                  console.log("Editor is ready!");
                },
              };
            };
          },
        },
        instanceReady: (editor) => {
          ejInstance.current = editor;
        },
        data: {
          //should add initial value with the same format that editor js saved
        },
      };

      const editor = new EditorJS(editorConfig);
      isReady.current = true;
    }
  }, []);

  return (
    <>
      <div
        className="add-product-modal-textEditor"
        id="editorjs"
        onChange={onChange}
      ></div>
    </>
  );
}
