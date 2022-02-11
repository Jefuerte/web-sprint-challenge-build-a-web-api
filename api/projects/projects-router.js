// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Project = require('./projects-model');

//Endpoints

router.get('/', (req, res) => {
    Project.get(req.params.id)
    .then(project => {
        res.status.json(200).json(project);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Project.get(id)
    .then(id => {
        if (!id) {
            res.status(404).json({
                message: 'Project not found'
            })
        } else {
            res.status(404).json(id)
        }
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    Project.getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
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

router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Project.update(id, changes)
    .then((project) => {
        if (!project.body.name || !project.body.description) {
            return res.status(404).json({
                message: 'error'
            })
        } else {
            res.status(200).json(project)
        }
    })
    .catch(err => {
        res.status(400).json({
            message: err.message
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Project.remove(id)
    .then((id) => {
        if (!id) {
            res.status(404).json({
                message: 'not working'
            })
        } else {
            res.status(200).json({
                message: 'not working ugly'
            })
        }
    }) 
    .catch(err => {
        res.status(404).json({
            message: err.message
        })
    })
})

module.exports = router;