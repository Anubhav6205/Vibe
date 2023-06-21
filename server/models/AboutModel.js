import mongoose from 'mongoose'

const aboutSchema=new mongoose.Schema({
    sub:{
        type:String
    },
    about:{
        type:String
    }
})

const AboutModel=mongoose.model('AboutModel',aboutSchema);
export default AboutModel;