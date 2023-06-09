import assert from 'assert'
import {getByUserId, getByUserName, getUserByPoliciesId }from "../services/user.js"
import {getPoliciesByUserName} from '../services/policies.js'
import mongoose from 'mongoose'
import { generateAuth ,isAdmin } from '../services/utils.js';

describe("Find value in database", function() {

    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/mocky'
    mongoose.connect(process.env.MONGODB_URI);

    it("should be able to find user by id", async function() {

        const result = await getByUserId("e8fd159b-57c4-4d36-9bd7-a59ca13057bb");
        assert.equal("e8fd159b-57c4-4d36-9bd7-a59ca13057bb",result.id)
        
    });

    it("should not be able to find user by id", async function() {

        const result = await getByUserId("1111");
        assert.equal(1,result)

    });

    it("Test the auth and token generation true for admin", async function() {

        const result = await generateAuth("Britney");
        assert.notEqual(result,1)
        const adminValue = await isAdmin(result);
        assert.equal(adminValue,1)

     });

     it("Test the auth and token generation true fr basic user", async function() {

        const result = await generateAuth("Barnett");
        assert.notEqual(result,1)
        const adminValue = await isAdmin(result);
        assert.equal(adminValue,0)

     });

    it("Test the auth and token generation false", async function() {

        const result = await generateAuth("Britney2");
        assert.equal(result,1)

    });

    it("should be able to find user by policie Id", async function() {

        const result = await getUserByPoliciesId("56b415d6-53ee-4481-994f-4bffa47b5239");
        assert.equal("e8fd159b-57c4-4d36-9bd7-a59ca13057bb",result.id)
    });

    
    it("should be able to find user by username", async function() {

        const result = await getByUserName("Manning");
        assert.equal("e8fd159b-57c4-4d36-9bd7-a59ca13057bb",result.id)
        
    });

    it("should not be able to find user by name", async function() {

        const result = await getByUserName("notARealUsername");
        assert.equal(1,result)

    });
    it("should be able to find a certain number of policies by username", async function() {

        const result = await getPoliciesByUserName("Manning");
        assert.equal(91,result.length)
        
    });
});