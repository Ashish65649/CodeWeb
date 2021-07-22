import React from "react";
import "./App.css";

function App() {
  let timer;
  function execute() {
    var htmlCode = document.querySelector("#html-code").value;
    var cssCode =
      "<style>" + document.querySelector("#css-code").value + "</style>";
    var jsCode = document.querySelector("#js-code").value;
    var iframe = document.querySelector("#output");
    document.querySelector("#output").contentDocument.body.innerHTML =
      htmlCode + cssCode;
    try {
      window.clearTimeout(timer);
      timer = setTimeout(function () {
        iframe.contentWindow.eval(jsCode);
      }, 2000);
    } catch (e) {}
  }

  function keyPress() {
    window.clearTimeout(timer);
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
                placeholder="HTML"
                onInput={execute}
              ></textarea>
              <div className="css-js">
                <textarea
                  id="css-code"
                  spellCheck="false"
                  className="css"
                  onInput={execute}
                  placeholder="CSS"
                />
                <textarea
                  id="js-code"
                  spellCheck="false"
                  className="js"
                  onKeyUp={execute}
                  onKeyPress={keyPress}
                  placeholder="Javascript (Don't write script tag)"
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
