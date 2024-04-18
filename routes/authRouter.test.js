import mongoose from "mongoose";
import app from "../app.js"
import dotenv from "dotenv";
import request from "supertest"
import {describe, expect, test} from '@jest/globals';
import * as authServices from '../services/authServices.js'
import * as authControlles from '../controllers/authControllers.js'
import { json } from "express"
import { subscriptionList } from "../constants/userConstants.js";
import jwt from 'jsonwebtoken'

dotenv.config();
const {TEST_DB_HOST, PORT = 3000, JWT_SECRET} = process.env;

describe("test /api/auth/signup route", ()=> {
  // let server = null;
  // beforeAll(async ()=> {
  //     await mongoose.connect(TEST_DB_HOST);
  //     server = app.listen(PORT);
  // })

  afterAll(async ()=> {
      // await mongoose.connection.close(TEST_DB_HOST);
      // await mongoose.disconnect()
      // server.close();
      console.log("first test end")
  })

  // afterEach(async ()=> {
  //     await authServices.clearUsers();
  // })

  test("test /api/users/register with valid data", async ()=> {
      const signupData = {
        subscription: "pro",
          email: "bogdan@gmail.com",
          password: "123456"
      };

      const {statusCode, body} = await request(app).post("/api/users/register").send(signupData);
      // const res = await request(app).post("/api/users/register").send(signupData);
      console.log(body)
      // console.log(res.statusCode)
      expect(statusCode).toBe(201);
      expect(body.user.email).toBe(signupData.email);
     

      const user = await authServices.findUser({email: signupData.email});
      // console.log(user)
      expect(user.subscription).toBe(signupData.subscription);
  })
})

// второй тест

describe("test /api/users/login route", ()=> {

  afterAll(async ()=> {

      await mongoose.disconnect()
      console.log("two test end")
  })


  test("test /api/users/login with valid data", async ()=> {
      const loginData = {
          email: "gvir2015@gmail.com",
          password: "gvir2015@",
          // subscription: "pro"
      };

      const {statusCode, body} = await request(app).post("/api/users/login").send(loginData);
      console.log(body);
      // const decodedToken = jwt.verify(body.token, JWT_SECRET);
      // console.log(decodedToken);
      expect(statusCode).toBe(200);
      expect(body.user).toBeDefined();
      expect(body.user).toHaveProperty('email');
     expect(body.user).toHaveProperty('subscription');
      expect(body.user.email).toContain(loginData.email)
      expect(subscriptionList).toContain(body.user.subscription);
      expect(body.token).toBeDefined();

      // const user = await authServices.findUser({email: loginData.email});
      // console.log(user._id);
      // expect(decodedToken.id).toContain(user._id);
      // expect(decodedToken.id).toBe(user._id);
     

      // const user = await authServices.findUser({email: loginData.email});
      
      // expect(user.email).toBe(loginData.email);
      
      // expect(user.subscription).toContainEqual(subscriptionList);
      // expect(user.subscription).toBe(loginData.subscription);
      
      
  })
})


