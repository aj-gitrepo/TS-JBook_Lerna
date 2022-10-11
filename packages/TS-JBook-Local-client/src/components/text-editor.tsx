import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";

import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

import "./text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  // const [value, setValue] = useState<string | undefined>('# Header');
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions(); //to replace value and setValue

  useEffect(() => {
    // to show text preview when clicked outside the MDEditor 
    const listener = (event: MouseEvent) => { //MouseEvent got by hovering addEventListener
      // to check if the click is inside the editor
      if(
        ref.current && 
        event.target && 
        ref.current.contains(event.target as Node) //as Node - contains(other: Node | null)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, []);

  if(editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor 
          value={cell.content} 
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)} > 
      <div className="card-content">
      <MDEditor.Markdown 
        source={cell.content || 'Click to edit'}
      />
      </div>
    </div>
  );
}

export default TextEditor;

// console.log(event.target); //to check where the user clicks
// className="text-editor" - to override and change the resizing element

// classname='card', card-content from bulma

