import { Fragment, useEffect } from "react";

import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import './cell-list.css';
import { useActions } from "../hooks/use-actions";

const CellList: React.FC = () => {
  //destructuring from state
  const cells = useTypedSelector(({ cells: {order, data} }) => order.map((id) => data[id])); 

  const { fetchCells } = useActions();

  const renderedCells = cells.map(cell => (
    <Fragment  key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  useEffect(() => {
    fetchCells();
  }, []); //execute one time at start

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
}

export default CellList;

// forceVisible={cells.length === 0} - returns true or false
