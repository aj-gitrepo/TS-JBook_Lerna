import { useEffect } from "react";

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";
import "./code-cell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  // const [code, setCode] = useState(''); //replaced by bundleReducer
  // const [err, setErr] = useState('');

  // creating, storing, updating and deleting cells using redux store
  const { updateCell, createBundle } = useActions(); 
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id); //returnsstring of array joined with code from current and prior cells

  // console.log(cumulativeCode);

  useEffect(() => {
    if(!bundle) { //to render the preview initially and to prevent 750ms lag
      createBundle(cell.id, cumulativeCode); //instead of current cell content (cell.content)
    }
    // to bundle code when changes are made
    const timer = setTimeout(async() => {
      createBundle(cell.id, cumulativeCode);
    }, 750); //executing after 750 milsec pause

    return () => {
      clearTimeout(timer);
    }
    // bundle dependency may create infinite loop 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]); //createBundle creates infinte loop so using useMemo in useAction file 

  return (
    <Resizable direction="vertical">
      <div
        // 'calc(100% - 10px' to allow marging for action-bar
        style={{ height: 'calc(100% - 8px', display: 'flex', flexDirection: 'row' }}
      >
        <Resizable direction="horizontal">
          <CodeEditor 
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/*progress-wrapper- to prevent the grey bg on animation in progress-cover */}
        <div className="progress-wrapper">
          {
            !bundle || bundle.loading ? (
              // from bulma css with custom added css
              <div className="progress-cover">
                <progress className="progress is-small is-primary" max="100">
                  Loading
                </progress>
              </div>
            ) : (
            <Preview code={bundle.code} err={bundle.err}/>
            )
          }
        </div>
      </div>
    </Resizable>
  );
}


export default CodeCell;

// <pre> - to display code in good format

// now once this function is executed in the useEffect hook 
// the esbuild value will have all the methods for 
// transpilling. therefore, instead of defining any refs we 
// can directly use esbuild for transform as shown below

//     const onClick = async () => {
      
//     	try{
//         	const res = await esbuild.transform(input, {
//             	loader: 'jsx', 
//               	target: 'es2015'
//             });
          
//           	console.log(res.code);
//         }catch(err){
//         	console.error(err);
//         }
//     }

// in text area

// const App = () => <div>Ho there</div>

// const a = 1;
// console.log(a);

// import React from "react";
// console.log(React);

// const message = require('nested-test-pkg');
// console.log(message);

// import 'bulma/css/bulma.css'

// import 'bulma/css/bulma.css';
// import 'tiny-test-pkg';

// try catch may not work well with setInterval based functions 

// risks of using eval
// using setInterval, pasting malacious code, running infinite loops

// other code execution websites use iframe for code execution

// changing the console to test.html and defining some values
// these values cannot be accessed by the main localhost window

// to get value from parent define the value in parent as
// >window.a = 1
// in test.html console
// >parent.a //returns 1

// in test.html console
// >window.b = 2
// to access this in parent frame
// in parent frame
// >document.querySelector('iframe).contentWindow.b

// these vals are accessed only because the current settings allow it
// iframes can be completely isolated from the parent frame by sandboxing iframe
// setting sandbox="" - returns cros origin frame error
// setting sandbox="allow-same-origin" - allows thw access of vals

// unfortunately in the method we are going to use ther user will not be able to access local
// storage and cookies

// sandbox='allow-scripts' - to enable code execution

// storing the code in head tag may result in storing huge data in head tag and a </script> 
// in the data closes the main script tag.

// eventListeners can be used to create light communications between parent and child
// We're going to watch for events saying that some new code has been created. Whenever some new code 
// has been bundled, we're going to receive it inside the iFrame and then just go ahead and execute it.
// So this is going to prevent this entire problem of having an attribute that is too long because 
// we're not going to communicate using attributes anymore. We're going to instead communicate all 
// this code as a plain string as intended.

// we're also going to make sure this is also going to help this entire problem of having an 
// escaped script tag, because now this code is going to be shared as a string as opposed to a 
// actual HTML snippet.

// after adding eventListener
// import React from 'react';
// import ReactDOM from "react-dom";

// const App = () => {
//   return (
//     <h1>Huray!!</h1>
//   );
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// after setting setTimeout for bundeling

// const root = document.querySelector('#root');
// root.innerHTML = 'asjgjkhlki'

// execute the above after adding timeout n preview

// here root is the id of div in the preview's body

// show([
//   {abd: "abd"},  
//   {abd: "abd"},  
// ]); 

// import React from 'react';
// import ReactDOM from 'react-dom';
// show(<div>element</div>);

// to check what is in raw div element
// console.log(<div>element</div>);
// Object { "$$typeof": Symbol("react.element"), type: "div", key: null, ref: null, props: {…}, _owner: null }

// import React from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//   return<h1>Happy Me!</h1>
// };

// show(<App/>);

// show(
//   <div>
//     <App />
//     <App />
//     <App />
//     <App />
//   </div>
// );

// if (value.$$typeof && value.props) { //check for jsx
