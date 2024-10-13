const express = require("express");
const bodyParser = require("body-parser");
const Tool = require("./models/post");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    "mongodb+srv://philvocke:WbLws0zLjePNzF10@node-angular.izll6lu.mongodb.net/Tesla-tools"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/tools", (req, res, next) => {
  const tool = new Tool({
    name: req.body.name,
    position: req.body.position,
    partNumber: req.body.partNumber,
    location: req.body.location,
    description: req.body.description,
  });
  tool.save().then((createdTool) => {
    res.status(201).json({
      message: "Tool added!",
      toolId: createdTool._id,
    });
  });
});

app.put("/api/tools/:id", (req, res, next) => {
  const tool = new Tool({
    _id: req.body.id,
    name: req.body.name,
    position: req.body.position,
    partNumber: req.body.partNumber,
    location: req.body.location,
    description: req.body.description,
  });
  Tool.updateOne({ _id: req.params.id }, tool).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

app.get("/api/tools", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const toolQuery = Tool.find();
  let fetchedTools;
  if (pageSize && currentPage) {
    toolQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  toolQuery
    .then((documents) => {
      fetchedTools = documents;
      const docCount = Tool.countDocuments();
      return docCount;
    })
    .then((docCount) => {
      res.status(200).json({
        message: "Tools fetched successfully!",
        tools: fetchedTools,
        maxTools: docCount,
      });
    });
});

app.get("/api/tools/:id", (req, res, next) => {
  Tool.findById(req.params.id).then((tool) => {
    if (tool) {
      res.status(200).json(tool);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

app.delete("/api/tools/:id", (req, res, next) => {
  Tool.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted" });
  });
});

module.exports = app;
