const express = require("express");
const projectsRouter = require("./projects/projects-router")
const actionsRouter = require("./actions/actions-router")

const server = express();
server.use(express.json());
server.use(projectsRouter)
server.use("/:id/actions", actionsRouter)

server.get("/", (req, res)=>{
    res.json({
        message: "server running successfully"
    })
})

const port = 4000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
