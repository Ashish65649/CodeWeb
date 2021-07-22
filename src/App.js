import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    let editor1 = window.ace.edit("editor1");
    let editor2 = window.ace.edit("editor2");
    let editor3 = window.ace.edit("editor3");

    editor1.setShowPrintMargin(false);
    editor1.setTheme("ace/theme/cobalt");
    editor1.session.setMode("ace/mode/html");
    editor1.setOptions({
      placeholder: "HTML",
    });

    editor2.setTheme("ace/theme/cobalt");
    editor2.session.setMode("ace/mode/css");
    editor2.setShowPrintMargin(false);
    editor2.setOptions({
      placeholder: "CSS (Don't write style tag)",
    });

    editor3.setShowPrintMargin(false);
    editor3.setTheme("ace/theme/cobalt");
    editor3.session.setMode("ace/mode/javascript");
    editor3.setOptions({
      placeholder: "JS (Don't write script tag)",
    });

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

  return (
    <>
      <div className="editor">
        <p className="header">
          CodeWeb
          <i
            className="fa fa-moon-o"
            style={{
              float: "right",
              marginTop: "0.5rem",
              marginRight: "0.5rem",
            }}
          ></i>
        </p>
        <div className="column">
          <div className="code-write">
            <div id="editor1" className="toggle"></div>
            <div id="editor2" className="toggle"></div>
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

// const [theme, setTheme] = useState("fa fa-moon-o");

// function changeTheme() {
//   var arr = document.querySelectorAll(".toggle");
//   if (theme === "fa fa-moon-o") {
//     setTheme("fa fa-sun-o");
//     for (let i = 0; i < arr.length; i++) {
//       arr[i].style.backgroundColor = "#CCCCFF";
//       arr[i].style.color = "black";
//       window.editor1.setHighlightActiveLine(false);
//       window.editor2.setHighlightActiveLine(false);
//       window.editor3.setHighlightActiveLine(false);
//     }
//   } else {
//     setTheme("fa fa-moon-o");
//     for (let i = 0; i < arr.length; i++) {
//       arr[i].style.backgroundColor = "#2F3129";
//       arr[i].style.color = "#fff";
//     }
//   }
// }
