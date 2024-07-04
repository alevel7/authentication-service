/* eslint-disable no-undef */
const chai = require("chai");
// const sinon = require("sinon");
const expect = chai.expect;

// const faker = require('@faker-js/faker');
// const db = require('../models');
const authServiceStub = require('./auth.service.stubs')
const authService = require('../service/auth.service')
const mocks = require('./models.mock')

describe("AuthService", function () {
    describe('registerUser', () => {

        it("should fail if payload is invalid", async function () {

            const payload = {
                firstName: mocks.User.firstName,
                lastName: mocks.User.lastName,
                phoneNumber: mocks.User.phoneNumber,
                username: mocks.User.username,
                bvn: mocks.User.bvn,
                password: mocks.User.password,
                uniqueId: mocks.User.uniqueId
            }

            // mock database response
            authServiceStub.registerUser.returns(payload);


            // perform action
            const response = await authService.registerUser(payload);

            // perform assertions and expectations
            expect(response.firstName).to.equal(payload.firstName);
            // expect(response.success).to.equal(true);
        });

        // it("should prevent creating a new category if already exist", async function () {

        //     // mock database responses
        //     categoryfindOne.returns(stubValue);


        //     // perform action
        //     const response = await adminService.addCategory({
        //         name: stubValue.name,
        //         description: stubValue.description,
        //         iconUrl: stubValue.iconUrl
        //     });

        //     // perform assertions and expectations
        //     expect(response.code).to.equal(400);
        //     expect(response.success).to.equal(false);
        // });

        // it('should return all categories', async () => {
        //     categoryfindAll.returns([])
        //     const response = await adminService.getCategories();
        //     expect(response.code).to.equal(200);
        //     expect(response.success).to.equal(true);
        // });

        // it('should update a category', async () => {
        //     const returnValue = {
        //         ...stubValue,
        //         reload: () => {
        //             return stubValue
        //         }
        //     }
        //     categoryfindOne.returns(returnValue)
        //     const response = await adminService.updateCategory({
        //         categoryId: stubValue.id,
        //         ...stubValue
        //     })
        //     expect(response.code).to.equal(200);
        //     expect(response.success).to.equal(true);
        // })

        // it('should fail to update a category not found', async () => {
        //     categoryfindOne.returns(null)
        //     const response = await adminService.updateCategory({
        //         categoryId: stubValue.id,
        //         ...stubValue
        //     })
        //     expect(response.code).to.equal(404);
        //     expect(response.success).to.equal(false);
        // })

    })
});