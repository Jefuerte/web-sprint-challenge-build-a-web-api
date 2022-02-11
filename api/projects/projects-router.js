// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');
const { 
    validateProjectId,
    validateProject
} = require('./projects-middleware');

//Endpoints

router.get('/', (req, res) => {
    Project.get()
    .then(project => {
        if(!project){
            res.status(200).json([])
        }else{
            res.status(200).json(project)
        }
    })
    .catch(() => {
        res.status(500).json({message: 'error'})
    })
})

router.get('/:id', validateProjectId, (req, res, next) => {
   try{
       res.status(200).json(req.params)
   } catch(err) {
       next(err);
   }
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
   Project.getProjectActions(req.params.id)
   .then(actions => {
       if (actions.length > 0) {
           res.status(200).json(actions)
       } else {
           res.status(400).json((actions))
       }
   })
   .catch(next)
})

router.post('/', (req, res) => {
    Project.insert(req.body)
    .then(post => {
        res.status(200).json(post)
    })
    .catch (err => {
        res.status(400).json({
            message: err.message
        })
    })
})

router.put('/:id',validateProject, validateProjectId, (req, res,) => {
    const {id} = req.params
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: 'error'})
    }else{
        Project.update(id, req.body)
        .then(success => {
            res.status(400).json(success)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }
})

router.delete('/:id', validateProjectId, async(req, res, next) => {
    try { 
        await Project.remove(req.params.id)
        res.json(res.Projects)
    } catch (err) {
        next(err)
    }
})

module.exports = router;