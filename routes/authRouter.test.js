import mongoose from "mongoose";
import app from "../app.js"
import request from "supertest"
import {describe, expect, test} from '@jest/globals';
import { subscriptionList } from "../constants/userConstants.js";

describe("test /api/users/login route", ()=> {

  beforeAll(async ()=> {
    console.log("test start")
})

  afterAll(async ()=> {
      await mongoose.disconnect()
      console.log("test end")
  })

  test("test /api/users/login with correct creds end status code of 200", async ()=> {
      const loginData = {
          email: "gvir2015@gmail.com",
          password: "gvir2015@"
      };

      const {statusCode, body} = await request(app).post("/api/users/login").send(loginData);
      // console.log(body);
      expect(statusCode).toBe(200);
      expect(body.user).toBeDefined();
      expect(body.user).toHaveProperty('email');
     expect(body.user).toHaveProperty('subscription');
      expect(body.user.email).toContain(loginData.email)
      expect(subscriptionList).toContain(body.user.subscription);
      expect(body.token).toBeDefined();    
  })
})


