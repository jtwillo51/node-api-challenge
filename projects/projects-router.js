const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/:id", validateID, (req, res) => {
  projects.get(req.params.id).then((project) => {
    res.json(project);
  });
});
router.get("/:id/actions", validateID, (req, res) => {
  projects.getProjectActions(req.params.id).then((actions) => {
    res.json(actions);
  });
});

router.post("/", validateProject, (req, res) => {
  projects.insert(req.body).then((project) => {
    res.json(project);
  });
});

router.put("/:id", validateID, validateProject, (req, res) => {
  projects.update(req.params.id, req.body).then((changes) => {
    res.json(changes);
  });
});

router.delete("/:id", validateID, (req, res) => {
  projects
    .remove(req.params.id)
    .then(() => {
      res.json({
        message: "project successfully deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Could not delete project",
      });
    });
});

function validateID(req, res, next) {
  projects
    .get(req.params.id)
    .then((thing) => {
      if (thing) {
        next();
      } else {
        res.status(400).json({
          message: "Project ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error getting project",
      });
    });
}

function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "Missing name and/or description",
    });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Must provide name and description",
    });
  } else if (req.body.name && req.body.description) {
    next();
  } else {
    res.status(500).json({
      message: "Could not create project",
    });
  }
}
module.exports = router;
