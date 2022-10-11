import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "./resizable.css";

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  if (direction === 'horizontal') {
    // no need constrains along vertical directions
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity], //[horizontal, vertical]
      minConstraints: [innerWidth *0.2, Infinity],
      width: width, //dynamic width
      height: Infinity,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    // no need constrains along horizontal directions
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
    };
  }

  useEffect(() => {
    // to avoid jumping of the editor while resizing using timeout
    let timer: any;
    // to dynamically adjust the widths of editor and preview on window resize
    // by updating states - updating state causes rerender
    const listener = () => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // to make constrains work well - if the editor width is greater than the 0.75 8 window.innerWidth
        if(window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    // removingb event listener on unMount
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width]); //width dependancy to remove warning

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;

// resizeHandles={['s']} - triangular resize 
// to make this visible css styling should be added

// to make the code editor visible 
// ResizableBox does not support % widths
// so using {Infinity}
// and width of 100% in code-editor.css

// maxConstraints={[Infinity, window.innerHeight * 0.9]} - width, height 
// here height is restricted to 90% of the inner window height

// types from ctrl click
// export class ResizableBox extends React.Component<ResizableBoxProps, ResizableBoxState> {}

// to avoid jumping of the editor while resizing using timeout in useEffect
// to avoid resizing of the editor back to (0.75% - hard coded width) after resizing the window
// using dynamic width by getting value from onResizeStop