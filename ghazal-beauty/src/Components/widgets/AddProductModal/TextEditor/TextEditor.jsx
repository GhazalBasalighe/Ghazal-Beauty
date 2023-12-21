import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";

export function TextEditor({ onChange, onSave }) {
  const ejInstance = useRef();
  const isReady = useRef(false);
  useEffect(() => {
    if (!isReady.current) {
      const editorConfig = {
        holder: "editorjs",
        placeholder: "توضیحات خود را بنویسید",
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
          onReady: {
            class: function OnReadyTool() {
              ejInstance.current = editor;
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
        },

        instanceReady: (editor) => {
          ejInstance.current = editor;
        },
        data: {},
      };

      const editor = new EditorJS(editorConfig);
      isReady.current = true;
    }
  }, []);

  const handleSave = async () => {
    try {
      const outputData = await ejInstance.current.save();
      console.log("EditorJS Output:", outputData.blocks);
      onChange(outputData);
      onSave(outputData);
    } catch (error) {
      console.error("Error saving EditorJS output:", error);
    }
  };

  return (
    <>
      <div className="add-product-modal-textEditor" id="editorjs"></div>
      <button onClick={handleSave}>Save EditorJS Output</button>
    </>
  );
}
