import ChatModel from "../models/ChatModel.js";
import AboutModel from "../models/AboutModel.js";
export const addUser = async (req, res) => {
  try {
    let existingUser = await ChatModel.findOne({ sub: req.body.sub });
    if (existingUser) {
      res.status(200).json({
        message: "User already exists",
      });
    } else {
      const newUser = new ChatModel(req.body);
      await newUser.save();
      res.status(200).json({
        message: "User added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};


export const getUser=async(req,res)=>{
    try{
        let user=await ChatModel.find({});
        res.status(200).json({
            message:"User fetched successfully",
            user:user
        })
        
    }
    catch(error)
    {
        res.status(500).json({
            message:"Something went wrong while fetching"
        })

    }
}

export const addAboutUser = async (req, res) => {
  try {
    const existingUser = await AboutModel.findOne({ sub: req.body.sub });
    if (existingUser) {
      // User already exists, update the `sub` field
      existingUser.sub = req.body.sub;
      existingUser.about = req.body.about;
      await existingUser.save();
    } else {
      // User doesn't exist, create a new user
      const newUser = new AboutModel({
        sub: req.body.sub,
        about: req.body.about,
      });
      await newUser.save();
    }

    res.status(200).json({
      message: "About set successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while setting about",
    });
  }
};


export const getAboutUser = async (req, res) => {
  try {
    const sub = req.query.sub;
    // console.log("backend sub:", sub);
    let user = await AboutModel.find({ sub: sub });
    res.status(200).json(user);
    // console.log(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching about",
    });
  }
};
