import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      let show = (value) => {
        const root = document.querySelector('#root');

        if (typeof value === 'object') {
          if (value.$$typeof && value.props) { 
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;
    // to execute show function only in the respective cell not in all cells //non- operation
    const showFuncNoop = 'show = () => {}'; 
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        // adding the show function only to the current cell
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};