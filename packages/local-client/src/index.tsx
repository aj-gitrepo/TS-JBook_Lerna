import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import 'bulmaswatch/superhero/bulmaswatch.min.css' //superhero is one of the different templates
import '@fortawesome/fontawesome-free/css/all.min.css';

// import CodeCell from "./components/code-cell";
// import TextEditor from "./components/text-editor";
import CellList from "./components/cell-list";
import { store } from "./state";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* to test if development mode in express is working */}
        {/* <h1>TEST</h1> */}
        <CellList />
      </div>
    </Provider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
