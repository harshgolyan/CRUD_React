const express = require('express')
const router = express.Router()
const Form = require('../models/form')

// save new user
router.post('/addUser',(req,res)=>{
    const {name,phone,email,hobbies} = req.body

    if(!name || !phone || !email || !hobbies){
        res.status(422).json({error:"all fields required"})
    }
    else{
        Form.findOne({email:email})
            .then(savedForm =>{
                if(savedForm){
                    res.status(422).json({error:"user already exist"})
                }
                else{
                    const form = new Form({
                        name:name,
                        phone:phone,
                        email:email,
                        hobbies:hobbies
                    })
                    form.save()
                        .then(user =>{
                            res.status(200).json({msg:"new user added successfully"})
                        })
                }
            }) 
    }
})


//show user in table
router.get("/showAllUser",(req,res)=>{
    Form.find()
        .populate("_id name")
        .then(users =>{
            res.json(users)
        })
})

//delete user

router.delete('/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
  
    Form.findByIdAndDelete(userId)
      .then(deletedUser => {
        if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  });


  //update user
  router.put('/updateUser/:id', (req, res) => {
    const { name, phone, email, hobbies } = req.body

    Form.findByIdAndUpdate(req.params.id,
        { name, phone, email, hobbies },
        { 
            new: true 
        })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', updatedUser });
        })
        .catch(error => {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router