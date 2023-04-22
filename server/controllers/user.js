const express = require("express");
const User = require("../models/user");
const Following = require("../models/following");
const Followers = require("../models/followers");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const directoryPath = "public/";
const { cloudinary } = require("../cloudinary");

module.exports = {
  userSignUp: async (req, res) => {
    try {
      if (req.body.password && req.body.username && req.body.email) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        
        const user = await User.create(req.body);
        const followLists={userId:user._id}

        const following=await Following.create(followLists)
        const followers=await Followers.create(followLists)

        res.json({ status: "ok" });
      } else {
        res.json({ status: "error", error: "All fields are required" });
      }
    } catch (error) {
      res.json({ status: "error", error: "Email already exists" });
    }
  },
  userLogin: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPasswordValid) {
          const token = jwt.sign(
            { username: user.username, email: user.email, id: user._id },
            "myWebAppSecretKey123"
          );
          console.log(token);
          // return res.json({ status: 'ok', user: true })
          return res
            .status(200)
            .json({ message: "Login Success", token, user: user.username });
        } else {
          return res.status(403).json({ message: "Password Does not Match" });
        }
      } else {
        return res.status(500).json({ message: "No User Found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  verifyToken: async (req, res) => {
    try {
      const Token = req.body.Token;
      console.log("token",Token)
      const decoded = jwt.verify(Token, "myWebAppSecretKey123");
      const email = decoded.email;
      const user = await User.findOne({ email: email });
      const userFollowing = await Following.findOne({ userId: user.id });
      const userFollowers = await Followers.findOne({ userId: user.id });
      const followingCount=userFollowing.following.length;
      const followersCount=userFollowers.followers.length;


      if (user.image.url) user.image.url = user.image.url;
      else
        user.image.url = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
      return res.status(200).json({ message: "token valid", user ,followingCount ,followersCount});
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { Token } = JSON.parse(req.params.Stoken);
      const decoded = jwt.verify(Token, "myWebAppSecretKey123");
      console.log(decoded);
      console.log("form data", req.body);
      const email = decoded.email;
      const user = await User.findOneAndUpdate({ email: email }, req.body);
      console.log(user,"this")
      return res.status(200).json({ message: "Profile Updation Successfull", user });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  },
  imageupload: async (req, res) => {
    try {
      console.log(req.files.image[0]);
      const { Token } = JSON.parse(req.params.Stoken);
      const decoded = jwt.verify(Token, "myWebAppSecretKey123");

      const user = await User.findOne({ _id: decoded.id }).select("-password");
      const oldImage = user.image;
      if (oldImage) {
        cloudinary.uploader.destroy(oldImage.filename);

        const remove = await User.updateOne(
          { _id: decoded.id },
          {
            $unset: { image: "" },
          }
        );
      }
      const update = await User.updateOne(
        { _id: decoded.id },
        {
          $set: {
            image: {
              url: req.files.image[0].path,
              filename: req.files.image[0].filename,
            },
          },
        }
      );
      const userdp = await User.findOne({ _id: decoded.id }).select(
        "-password"
      );

      console.log(userdp);
      return res.status(200).json({ message: "user found", userdp });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  removeimage: async (req, res) => {
    try {
      const { Token } = JSON.parse(req.params.Stoken);
      const decoded = jwt.verify(Token, "myWebAppSecretKey123");
      const user = await User.findOne({ _id: decoded.id }).select("-password");
      const oldImage = user.image;

      if (oldImage) {
        cloudinary.uploader.destroy(oldImage.filename);

        const remove = await User.updateOne(
          { _id: decoded.id },
          {
            $unset: { image: "" },
          }
        );
      }
      const image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`;
      return res.status(200).json({ message: "user found", image });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const { Token } = JSON.parse(req.params.Stoken);
      const decoded = jwt.verify(Token, "myWebAppSecretKey123");
      const user = await Following.findOne({ userId: decoded.id });
      
      const users = await User.find({ _id: { $not: { $eq: decoded.id } } }).select("-password");
      



    
      if(user.following.length!=0){
      let following = [];
       usersData = users.map((obj) => {
        let isFollowing = false;
        console.log(obj._id);
        console.log("id", user.following[0]._id);
        for (i = 0; i < user.following.length; i++) {
          if (user.following[i]._id.toString() == obj._id.toString()) {
            isFollowing = true;
            following.push({_id:obj._id,username:obj.username})
          }
        }
      console.log("findeed")

        return {
          ...obj._doc,
          isFollowing,
        };
      });
    }else{
      usersData=users
      console.log("finded")
    }


console.log(usersData,"hgkujjfguj")
      if (!users)
        return res
          .status(500)
          .json({ message: "didnt got users from database" });

      res.status(200).json({ message: "Success", usersData });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  },
  follow: async (req, res) => {
    try {
      console.log("user")
      const { Token } = JSON.parse(req.params.Stoken);
      console.log("token",Token)

      const { userId } = req.params.userId;
      const decoded = jwt.verify(Token, "myWebAppSecretKey123");
      const id = decoded.id;
      const userData = {
        _id: req.params.userId,
      };
      const followedData = {
        _id: id,
      };
      console.log("user", userData);
      // const user = await User.findOneAndUpdate({ email: email },req.body)
      // const user = await User.findByIdAndUpdate(
      //   id,
      //   { $addToSet: { following: userData } },
      //   { new: true }
      // );
      const user = await Following.findOneAndUpdate(
        {userId:id},
        { $addToSet: { following: userData } },
        { new: true }
      );
      const followed = await Followers.findOneAndUpdate(
        {userId:req.params.userId},
        { $addToSet: { followers: followedData } },
        { new: true }
      );
      console.log("gjhfmh",user)
      const users = await User.find({ _id: { $not: { $eq: decoded.id } } }).select("-password");



      let following = [];
      const usersData = users.map((obj) => {
        let isFollowing = false;
        console.log(obj._id);
        console.log("id", user.following[0]._id);
        for (i = 0; i < user.following.length; i++) {
          if (user.following[i]._id.toString() == obj._id.toString()) {
            isFollowing = true;
            following.push({_id:obj._id,username:obj.username})
          }
        }
        return {
          ...obj._doc,
          isFollowing,
        };
      });




      console.log("list", usersData[0]);
      console.log(following);
      const followingCount=user.following.length

      // for(let f of user.following){
      //     let index=users.findIndex(pro=>pro._id==user._id.toString())
      //     if(index!=-1)
      //     products[index].inWishlist=true
      //   }

      return res.status(200).json({ message: "token valid",followingCount,usersData  });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user=await User.findById(id)
      console.log(user)
      
      console.log("hayyy",id)
     
      return res.status(200).json({ message: "User Found" ,user});
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid user" });
    }
  },
};
