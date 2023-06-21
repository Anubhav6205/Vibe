import mongoose from 'mongoose'
import grid from 'gridfs-stream'


//for converting mongoose bnary file data to actia data
let gfs;
let gridFSBucket;
const connection=mongoose.connection;
//as soon as connection starts the function gets executed
connection.once('open',()=>{
    //first argument db of mongoose 
    //second aegument bucket name 
    gridFSBucket=new mongoose.mongo.GridFSBucket(connection.db,{
        bucketName:'fs'
    })
    //calling grid function with database connection object 
    //and the mongodb driver object
    gfs=grid(connection.db,mongoose.mongo);
    gfs.collection('fs');
})


export const uploadFile=async(req,res)=>{
    const url="http://localhost:8000"

    try{
        if(!req.file)
        {
            return res.status(400).send({message:`Please upload a file`});
        }
        // console.log(req.file)
        // console.log("req file ");
        const imageUrl= `${url}/file/${req.file.filename}`;
        return res.status(200).json(imageUrl)


    }
    catch(error)
    {
        console.log(`Error in uploading file:${error}`);
        res.status(500).send({message:`Error sending file`});

    }
}


export const getFile=async(req,res)=>{
    try{
        
        const file = await gfs.files.findOne({filename:req.params.filename});
        const readStream=gridFSBucket.openDownloadStream(file._id);
        //important
        readStream.pipe(res);
    }
    catch(error)
    {
        console.log(`Error in getting file:${error}`);
        res.status(500).send({message:`Error getting file`});
    }
}