import {useRef} from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react"; //onChange is type def
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel'; //to parse advanced js code so it may have es2015, 2016 etc
// import MonacoJSXHighlighter from 'monaco-jsx-highlighter'; //no types file for this 
// import codeShift from 'jscodeshift';
// import traverse from "@babel/traverse";
// import {parse} from "@babel/parser";

import './code-editor.css'

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void; //returns void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {

  const editorRef = useRef<any>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    // const highlighter = new MonacoJSXHighlighter(
    //   monaco,
    //   parse,
    //   traverse,
    //   editor
    // );
    // highlighter.highlightOnDidChangeModelContent(
    //   () => {},
    //   () => {},
    //   undefined,
    //   () => {}
    // );
  };

  const onEditorChange: OnChange = (code) => { //: OnChange- to better annotate the type of callback instead of code: string | undefined)
    onChange(code || "");
  }

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getValue();
    // format that value
    const formattedCode = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parserBabel],
      useTabs: false,
      semi: true, //to add semicolon at the end of lines
      singleQuote: true,
    }).replace(/\n$/, ''); //by default prettier adds new line at the end this may not cause some prob in future so replacing with ''
    // set the formatted value back in the editor
    editorRef.current.setValue(formattedCode);
  }

  return (
    <div className="editor-wrapper">
      <button 
        onClick={onFormatClick}
        className="button button-format is-primary is-small"
      >
        Format
      </button>
      <Editor 
        onMount={handleEditorDidMount}
        onChange={onEditorChange}
        defaultValue={initialValue}
        height="100%"
        defaultLanguage="javascript" //helps in autocomplete
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false }, //to remove the map om the side
          showUnused: false, //to not dim unused imports
          folding: false, //to remove the marging to the left
          lineNumbersMinChars: 3, //space on left side of line numbers
          fontSize: 20,
          scrollBeyondLastLine: false, //only the code is seen no space below
          automaticLayout: true, //to enable auto adjusting on shrink and expand
          tabSize: 2,
        }}
      />
    </div>
  );
}

export default CodeEditor;

// For TypeScript type definitions, this package uses the monaco-editor package as a peer dependency.
// >yarn add monaco-editor

// types from
//  options?: monaco.editor.IStandaloneEditorConstructionOptions; - ctrl click on IStandaloneEditorConstructionOptions
// IStandaloneEditorConstructionOptions extends IEditorConstructionOptions - ctrl click on IEditorConstructionOptions
// interface IEditorConstructionOptions extends IEditorOptions  - ctrl click on IEditorOptions
  // wordWrap - on

// .editor-wrapper:hover .button-format //the button is visile only when the cursor is on the div tag with
// classname editor-wrapper
