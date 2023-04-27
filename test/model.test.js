import assert from 'assert'
import {getByUserId, getByUserName, getUserByPoliciesId }from "../services/user.js"
import mongoose from 'mongoose'
import { generateAuth } from '../services/utils';
describe("Find value in database", function() {

    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/mocky'
    mongoose.connect(process.env.MONGODB_URI);

    it("should be able to find user by id", async function() {
        const result = await getByUserId("e8fd159b-57c4-4d36-9bd7-a59ca13057bb");
        assert.equal("e8fd159b-57c4-4d36-9bd7-a59ca13057bb",result.id)
        
    });
    it("should not be able to find user by id", async function() {
        // there is no user with this id in the database
        const result = await getByUserId("1111");
        assert.equal(1,result)
    });

    it("Test the auth and token generation", async function() {
        // there is no user with this id in the database
        const result = await generateAuth("Britney");
        assert.equal()
    });
});