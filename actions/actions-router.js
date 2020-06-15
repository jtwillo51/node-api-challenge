const express = require("express")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

router.get("/:id", validateID, (req, res)=>{
    actions.get(req.params.id)
    .then(action=>{
        res.json(action)
    })
})

router.post("/", validateAction,(req, res)=>{
    actions.insert(req.body)
    .then(action=>{
        res.json(action)
    })
})

router.put("/:id", validateID, validateAction,(req, res)=>{
    actions.update(req.params.id, req.body)
    .then(action=>{
        res.json(action)
    })
})

router.delete("/:id", validateID, (req, res)=>{
    actions.remove(req.params.id)
    .then(()=>{
        res.json({
            message: "Action removed successfully"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Could not remove action"
        })
    })
})


function validateID(req, res, next){
    actions.get(req.params.id)
    .then(thing =>{
        if(thing){
            next()
        } else {
            res.status(400).json({
                message: "Action ID does not exist"
            })
        } 
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            message: "Error getting action"
        })
    })
}

function validateAction(req, res, next){
    
    if(!req.body){
        res.status(400).json({
            message: "Missing name and/or description"
        })
    } else if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({
            message: "Must provide name and description"
        })
    } else if(req.body.name && req.body.description && req.body.notes){
        next()
    } else{
        res.status(500).json({
            message: "Could not create project"
        })
    }
}
module.exports = router;