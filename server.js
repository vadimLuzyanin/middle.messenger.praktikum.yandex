// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
