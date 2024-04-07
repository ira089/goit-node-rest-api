import mongoose from "mongoose";
import app from "../app.js"
import dotenv from "dotenv";
import request from "supertest"
import * as authServices from '../services/authServices.js'

dotenv.config();
const {TEST_DB_HOST, PORT = 3000} = process.env;



describe("test /api/users/login route", ()=> {
    let server = null;
    beforeAll(async() => {
        console.log('Виконати на початку тестів');
        await mongoose.connect(TEST_DB_HOST);
        server = app.listen(PORT);
        console.log("Test connection successful");
      });

    
    
      afterAll(async() => {
        console.log('Виконати після тестів');
        await mongoose.connection.close();
        server.close();

      });
     
      afterEach(async() => {
await authServices.clearUsers();
        console.log('Виконати наприкінці кожного тесту');

      });

      test("test /api/users/login with valid data", async ()=> {
        const userData =  {
            email: "masha3@gmail.com",
            subscription: "pro",
            password: "masha3"

        }

      const {statusCode, body} = await request(app).post("/api/users/login").send(userData);
      expect(statusCode).toBe(201);
      expect(body.email).toBe(userData.email);
      expect(body.subscription).toBe(userData.subscription);
    
      const userLogin = await authServices.findUser({email: userData.email})
      expect(userLogin.email).toBe(userData.email);
      })
    
})