const assert = require("assert");
const {getEndIndex,getHasNext} = require("../utilities/util");
const fs = require('fs');
var request = require("supertest");
const app = require("../app");
let rawdata = fs.readFileSync('test/data.json');
let tickets = JSON.parse(rawdata);

describe("getEndIndex", function () {
    describe("#gettigEndIndex", function () {
      it("should return 35", function () {
          const result = getEndIndex(tickets,10,0);
        assert.strictEqual(result, 35);
      });
    });
  });
  describe("getHasNext", function () {
    describe("#gettingHasNext", function () {
      it("should return true", function () {
          const result = getHasNext(25,tickets,0);
        assert.strictEqual(result, true);
      });
    });
  });
  describe("Home page", function () {
    describe("GET /", function () {
      it("should return 200 OK", async function () {
        const response = await request(app)
          .get("/")
          .expect(200)
          .expect("Content-Type", 'text/html; charset=utf-8');
          
      });
  
    
    });
  });