import { useRef, useEffect } from "react";

import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id='root'></div>
    <script>
      const handleError = (err) => {
        //to handle asynchronus error ( when user uses setTimeout) or invalid code errors
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err); //to log err
      };

      window.addEventListener('error', (event) => {
        //to handle asynchronus error ( when user uses setTimeout) errors
        event.preventDefault(); //to prevent console log of browser errors
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html; //to reset the iframe html each time, so that the previous vals are reset
    // to give some time to reset the srcdoc and then postMessage or it gets reset immediately
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
    
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe 
        title="preview" 
        ref={iframeRef} 
        sandbox='allow-scripts' 
        srcDoc={html} 
      />
      {/* error due to invalid code type */}
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
