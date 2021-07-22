import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    let editor1 = window.ace.edit("editor1");
    let editor2 = window.ace.edit("editor2");
    let editor3 = window.ace.edit("editor3");

    editor1.setShowPrintMargin(false);
    editor1.setTheme("ace/theme/cobalt");
    editor1.session.setMode("ace/mode/html");

    editor2.setTheme("ace/theme/cobalt");
    editor2.session.setMode("ace/mode/css");
    editor2.setShowPrintMargin(false);

    editor3.setShowPrintMargin(false);
    editor3.setTheme("ace/theme/cobalt");
    editor3.session.setMode("ace/mode/javascript");

    editor1.session.on("change", function (delta) {
      execute(
        editor1.getSession().getValue(),
        editor2.getSession().getValue(),
        editor3.getSession().getValue()
      );
    });

    editor2.session.on("change", function (delta) {
      execute(
        editor1.getSession().getValue(),
        editor2.getSession().getValue(),
        editor3.getSession().getValue()
      );
    });

    editor3.session.on("change", function (delta) {
      execute(
        editor1.getSession().getValue(),
        editor2.getSession().getValue(),
        editor3.getSession().getValue()
      );
    });

    function execute(htmlCode, cssCode, jsCode) {
      cssCode = "<style>" + cssCode + "</style>";
      var iframe = document.querySelector("#output");
      document.querySelector("#output").contentDocument.body.innerHTML =
        htmlCode + cssCode;
      try {
        iframe.contentWindow.eval(jsCode);
      } catch (e) {}
    }
  }, []);

  const [theme, setTheme] = useState("fa fa-moon-o");

  function changeTheme() {
    let editor1 = window.ace.edit("editor1");
    let editor2 = window.ace.edit("editor2");
    let editor3 = window.ace.edit("editor3");
    if (theme === "fa fa-moon-o") {
      document.querySelector("#editor1").style.color = "black";
      document.querySelector("#editor2").style.color = "black";
      document.querySelector("#editor3").style.color = "black";
      setTheme("fa fa-sun-o");
      editor1.setOptions({
        theme: "ace/theme/kuroir",
      });
      editor2.setOptions({
        theme: "ace/theme/kuroir",
      });
      editor3.setOptions({
        theme: "ace/theme/kuroir",
      });
    } else {
      document.querySelector("#editor1").style.color = "white";
      document.querySelector("#editor2").style.color = "white";
      document.querySelector("#editor3").style.color = "white";
      setTheme("fa fa-moon-o");
      editor1.setOptions({
        theme: "ace/theme/cobalt",
      });
      editor2.setOptions({
        theme: "ace/theme/cobalt",
      });
      editor3.setOptions({
        theme: "ace/theme/cobalt",
      });
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
            <p className="info"> HTML </p>
            <div id="editor1" className="toggle"></div>
            <p className="info"> CSS </p>
            <div id="editor2" className="toggle"></div>
            <p className="info"> Javascript </p>
            <div id="editor3" className="toggle"></div>
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
