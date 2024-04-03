import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  Fdesc: {
    type: String,
    required: true,
  },
});

const Feed = mongoose.model("Feed", FeedSchema);

export default Feed;
