"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { generateUploadURL } = require("./s3");

const {
  getCompanies,
  addTestUser,
  getUserById,
  getUserByEmail,
  editUserById,
  addUser,
  getUsersByCo,
  addJob,
  getJobs,
  getJobById,
} = require("./handlers");
const PORT = 4000;
express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //endpoints
  .get("/api/companies", getCompanies)
  .get("/api/user/:userid", getUserById)
  .get("/api/usersbyco/:company", getUsersByCo)
  .get("/api/userbyemail/:email", getUserByEmail)
  .post("/api/test/user", addTestUser)
  .put("/api/editUser/:userid", editUserById)
  .post("/api/addUser/", addUser)
  .post("/api/addjob/", addJob)
  .get("/api/getJobs/", getJobs)
  .get("/api/job/:id", getJobById)
  .get("/s3Url", async (req, res) => {
    const url = await generateUploadURL();
    res.send({ url });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
