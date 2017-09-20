const User = require("../models/User")
const Place = require('../models/Place')
const Product = require('../models/Product')

const mongoose = require("mongoose");
  mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to DB"));

        if (process.env.NODE_ENV === 'development') {
          require('dotenv').config()
        }
const users = [
  {
    name: 'Juan',
    email: 'juan@juan.es',
    password:'123',
    picture: {
      pic_path: 'https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjNyuKKkLTWAhWNK1AKHWZrCxEQjRwIBw&url=https%3A%2F%2Fwww.vccircle.com%2Fdefault-profile%2F&psig=AFQjCNHIvYEAuHlmD3eth9S04j8_1l35UQ&ust=1506009329249900',
      pic_name: 'no picture'
    }
  },
  {
    name: 'María',
    email: 'maria@maria.es',
    password:'123',
    picture: {
      pic_path: 'https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjNyuKKkLTWAhWNK1AKHWZrCxEQjRwIBw&url=https%3A%2F%2Fwww.vccircle.com%2Fdefault-profile%2F&psig=AFQjCNHIvYEAuHlmD3eth9S04j8_1l35UQ&ust=1506009329249900',
      pic_name: 'no picture'
    },
  },
  {
    name: 'Ana',
    email: 'ana@ana.es',
    password:'123',
    picture: {
      pic_path: 'https://www.google.es/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjNyuKKkLTWAhWNK1AKHWZrCxEQjRwIBw&url=https%3A%2F%2Fwww.vccircle.com%2Fdefault-profile%2F&psig=AFQjCNHIvYEAuHlmD3eth9S04j8_1l35UQ&ust=1506009329249900',
      pic_name: 'no picture'
    }
  }
];



User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach(user => console.log(user.name));
  mongoose.connection.close();
});
