import React, { useState } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("fa fa-moon-o");

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
      }, 1000);
    } catch (e) {}
  }

  function changeTheme() {
    var arr = document.querySelectorAll("textarea");
    if (theme === "fa fa-moon-o") {
      setTheme("fa fa-sun-o");
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.backgroundColor = "#fff";
        arr[i].style.color = "black";
      }
    } else {
      setTheme("fa fa-moon-o");
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.backgroundColor = "#2e2e2e";
        arr[i].style.color = "#fff";
      }
    }
  }

  return (
    <>
      <div className="editor">
        <p className="header">
          CodeWeb
          <i
            onClick={changeTheme}
            className={theme}
            style={{
              float: "right",
              marginTop: "0.5rem",
              marginRight: "0.5rem",
            }}
          ></i>
        </p>
        <div className="column">
          <div className="code-write">
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
                placeholder="CSS (Don't write style tag)"
              />
              <textarea
                id="js-code"
                spellCheck="false"
                className="js"
                onInput={execute}
                placeholder="Javascript (Don't write script tag)"
              />
            </div>
          </div>
          <div className="code-output">
            <iframe frameBorder="0" title="output" id="output"></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
