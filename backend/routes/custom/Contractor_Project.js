const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Contractor_Project.findAll({
        include: [
            db.Contractor,
            db.Project
        ]
    })
        .then((Contractor_Project) => res.send(Contractor_Project))
        .catch((err) => {
            console.log('There was an error querying Contractor Project 1', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:contractorProjectID', (req, res, next) => {
    const db = req.app.get('db')

    return db.Contractor_Project.find({
        where: {
            contractorProjectID:req.params.contractorProjectID,
        }
    })
        .then((Contractor_Project) => {
            res.send(Contractor_Project)
        })
        .catch((err) => {
            console.log('There was an error querying Contractor Project 2', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Contractor_Project.create({
        contractorID: req.body.ContractorID,
        projectID: req.body.ProjectID
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Contractor Project', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update/:contractorProjectID', (req, res, next) => {
    const db = req.app.get('db')
    db.Contractor_Project.update({
        contractorID: req.body.ContractorID,
        projectID: req.body.ProjectID
        }, {
            where: {
                contractorProjectID: contractorProjectID
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Contractor Project', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:ContractorProjectID/:ProjectID', (req, res, next) => {
    const db = req.app.get('db')
    
    db.Contractor_Project.destroy({
        where: { contractorProjectID: req.params.ContractorProjectID,
                projectID: req.params.ProjectID}
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Contractor Project', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router