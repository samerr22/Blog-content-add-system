
import Content from "../models/Content.model.js";
import { errorHandle } from "../utils/error.js";




export const concreate = async (req, res, next) => {
  
  const { title, image,  idea, desc,tips } = req.body;

  const newcontent = new Content({
    title,
    image,
    idea,
    desc , 
    tips
  });
  try {
    const savedcontent = await newcontent.save();
    res.status(201).json(savedcontent);
  } catch (error) {
    next(error);
  }
};




export const getContent = async (req, res, next) => {
  try {
   
      const conts = await Content.find();

      if (conts.length > 0) {
        res.json({
          message: "student details retrieved successfully",
          conts,
        });
      } else {
        return next(errorHandle(404, " Content not fonud "));
      }
   
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};



export const deletecon = async (req, res, next) => {
  
  try {
    await Content.findByIdAndDelete(req.params.contentId);
    res.status(200).json("The content has been deleted");
  } catch (error) {
    next(error);
  }
};



export const updatecont = async (req, res, next) => {
  
  try {
    const updatecont = await Content.findByIdAndUpdate(
      req.params.ContentId,
      {
        $set: {
          title: req.body.title,
          image: req.body.image,
          idea: req.body.idea,
          desc: req.body.desc,
          tips: req.body.tips,
        },
      },
      { new: true }
    );
    res.status(200).json(updatecont);
  } catch (error) {
    next(error);
  }
};




