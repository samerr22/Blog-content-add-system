import mongoose from 'mongoose';


const ContentSchema = new mongoose.Schema({
  title: {
        type: String,
        required: true
      },
 
  image: {
    type: String, 
    required: true
  },
  idea: {
    type: String, 
    required: true
  },
  desc: {
    type: String, 
    required: true
  },
  tips: {
    type: String, 
    required: true
  },
  
  
});


const Content = mongoose.model('Content', ContentSchema);

export default  Content;
