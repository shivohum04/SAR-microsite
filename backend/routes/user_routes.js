import express from 'express';
import { user } from '../models/user_model.js';
const router = express.Router();

// to save new data to the database
router.post('/', async (request,response)=>{
    try{
        if (
            !request.body.name ||
            !request.body.phone_no ||
            !request.body.city ||
            !request.body.usercount
        ){
            return response.status(400).send({
                message:'fill in all the required fields',
            });
        }
        const newuserData= {
             name:request.body.name,
             phone_no:request.body.phone_no,
             city:request.body.city,
             usercount:request.body.usercount,

        }
        const createduser = await user.create(newuserData);

        return response.status(201).send(createduser);

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});

    }
});
// to get all users
router.get('/', async (request, response)=>{
    try{
        const users = await user.find({});
        return response.status(200) .json(users);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});


    }
});
// to get info of one user 
router.get('/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const user= await user.findById(id);

        return response.status(200).json({
            count: users.length,
            data: users
    });

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})
// Route to update users 

router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.name ||
            !request.body.phone_no||
            !request.body.city||
            !request.body.bikecount
        ){
            return response.status(400) .send({
                message: 'send all required field '
            });
        }
        const { id } = request.params;
        const result = await user.findByIdAndUpdate(id,request.body);

        if (!result){
            return response.status(404).json({message:"the user is not found"});
        }
        return response.status(200).send({message:'user updated successfully'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
 });
// Route to delete user
 router.delete('/:id', async (request, response)=>{
    try{
        const { id } = request.params;
        const result = await UserActivation.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'user not found'});
        }
        return response.status(200).send({message:'user delelted successfully'})

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
 });

 export default router;
 