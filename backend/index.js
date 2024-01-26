import express, { request, response } from "express";
import { PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { user } from './models/user_model.js';
import user_routes from './routes/user_routes.js';

const app = express();
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('welcome to the microsite');
});

// middleware for parsing the request body
app.use(express.json());

// middleware to handle CORS policy 
app.use(cors());
app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("welcome to the microsite ");
});

app.use('/user',user_routes);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App successfully connected to the database');
    app.listen(PORT,()=>{
        console.log(`App is listning to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);

})
