import express from "express";
import path from "path";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import React from "react";
import App from "../../client/src/App";

const PORT = 8080;

const app = express();

const craDistFolder = path.join(
  path.resolve(process.cwd(), "../client"),
  "dist"
);
const craStaticFolder = path.join(craDistFolder, "static");
console.log(craStaticFolder);

// Liveness check
app.get(`/health`, (req, res) => {
  res.sendStatus(200);
});

/**
 * Route to server static assets
 */
app.use("/static", express.static(craStaticFolder));

/**
 * Route to serve react app
 */
app.get("/", (req, res) => {
  fs.readFile(
    path.join(craDistFolder, "index.html"),
    "utf-8",
    (err, indexHtml) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
        return;
      }

      // Render the component to a string
      const html = ReactDOMServer.renderToString(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );

      const enhancedHtml = indexHtml.replace("__REACT_APP__", html);
      res.send(enhancedHtml);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Serving from ${PORT}`);
});
