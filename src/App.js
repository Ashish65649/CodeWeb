import React from "react";
import "./App.css";

function App() {
  function execute() {
    var htmlCode = document.querySelector("#html-code").value;
    var cssCode =
      "<style>" + document.querySelector("#css-code").value + "</style>";
    var jsCode = document.querySelector("#js-code").value;
    var iframe = document.querySelector("#output");
    document.querySelector("#output").contentDocument.body.innerHTML =
      htmlCode + cssCode;
    try {
      iframe.contentWindow.eval(jsCode);
    } catch (e) {}
  }

  return (
    <>
      <div className="editor">
        <p className="header"> CodeWeb </p>
        <div className="column">
          <div className="code-write">
            <div className="row">
              <textarea
                id="html-code"
                spellCheck="false"
                className="html"
                placeholder="Write html code here"
                onInput={execute}
              ></textarea>
              <div className="css-js">
                <textarea
                  id="css-code"
                  spellCheck="false"
                  className="css"
                  onInput={execute}
                  placeholder="Write css code here"
                />
                <textarea
                  id="js-code"
                  spellCheck="false"
                  className="js"
                  onInput={execute}
                  placeholder="Write js code here(Don't write script tag)"
                />
              </div>
            </div>
          </div>
          <div className="code-output">
            <iframe title="output" id="output"></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
