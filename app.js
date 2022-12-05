const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const port = 300;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("./static"));
app.use(require("./commandsRes"));

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
