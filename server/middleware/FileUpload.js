import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
const storage=new GridFsStorage({
    url:process.env.URI,
    options:{useUnifiedTopology:true,useNewUrlParser:true},


    //tells how file will be stored and named
    //stored info about uploaded file 
    file:(request,file)=>{    
     return `${Date.now()}-file-${file.originalname}`;

    
   

}
     

})

export default multer({storage})