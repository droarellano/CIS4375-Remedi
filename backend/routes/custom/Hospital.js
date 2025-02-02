const express = require('express')
const router = express.Router({ caseSensitive: true })

//crud - read
//raw : true = returning all values and findAll is where it'll return all of the data
//not using shortcuts like what we use in 4339 cause
//and 1. its for mongoose 2. its calling sections of a massive table
//where as in here, we are calling the entire code of a table
router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Hospital.findAll({
    raw: true,
  })
    .then((Hospital) => res.send(Hospital))
    .catch((err) => {
      console.log('There was an error querying Hospital', JSON.stringify(err))
      return res.send(err)
    })
})

//placeholder
router.get('/find/:id', (req, res, next) => {
  const db = req.app.get('db')

  return db.Hospital.find({
    where: {
      hospitalID: req.params.id,
    },
  })
    .then((Hospital) => {
      res.send(Hospital)
    })
    .catch((err) => {
      console.log('There was an error querying Hosiptal', JSON.stringify(err))
      return res.send(err)
    })
})
//crud - create
router.post('/create', (req, res, next) => {
  //since the id is auto increment, there is no need to call it again.
  //the reason to use req.body.name instead of req.body.emrName is that its calling from the label and not the field type when we did our export in emrList.vue
  //u can see it from emrList.vue from line 61 to 66.

  const db = req.app.get('db')
  db.Hospital.create({
    hospitalName: req.body.name,
    hospitalAddressLineOne: req.body.addressOne,
    hospitalAddressLineTwo: req.body.addressTwo,
    hospitalCity: req.body.city,
    hospitalState: req.body.state,
    hospitalZipCode: req.body.zipcode,
    hospitalContactPhone: req.body.phone,
    hospitalContactEmail: req.body.email,
    hospitalContactName: req.body.contact,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error creating Hospital', JSON.stringify(err))
      return res.send(err)
    })
})
// crud - update
router.put('/update/:id', (req, res, next) => {
  //preload the data into emrID and emrName

  const db = req.app.get('db')
  console.log(req.body)

  db.Hospital.update(
    {
      //using the update command, it changes the emrName where the emrID is emrID
      //side note, although they are the same but what it really means is that int x = y;
      //therefore emrName from the database is equal or : to emrName or the value of y which is preloaded.
      hospitalName: req.body.name,
      hospitalAddressLineOne: req.body.addressOne,
      hospitalAddressLineTwo: req.body.addressTwo,
      hospitalCity: req.body.city,
      hospitalState: req.body.state,
      hospitalZipCode: req.body.zipcode,
      hospitalContactPhone: req.body.phone,
      hospitalContactEmail: req.body.email,
      hospitalContactName: req.body.contact,
    },
    {
      where: {
        hospitalID: req.params.id,
      },
    },
  )
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error updating Hospital', JSON.stringify(err))
      return res.send(err)
    })

    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error updating Hospital', JSON.stringify(err))
      return res.send(err)
    })
})
// crud - delete by id
router.delete('/delete/:id', (req, res, next) => {
  //gets the value of what is being called above and set it to id
  const db = req.app.get('db')

  db.Hospital.destroy({
    //destroy or delete from EMR where the id is equal to what we set earlier
    where: { hospitalID: req.params.id },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log('There was an error deleting Hospital', JSON.stringify(err))
      return res.send(err)
    })
})

module.exports = router
