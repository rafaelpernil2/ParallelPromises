"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const data_util_1 = require("../utils/data-util");
const promise_util_1 = require("../utils/promise-util");
describe("Initial test. The method DataUtil.customPromiseAll with a predefined set of dummy promises...", () => {
    it("should return the following object", () => __awaiter(void 0, void 0, void 0, function* () {
        const concurrentLimit = 3;
        const listOfPromises = [
            {
                name: "GetSomething",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "CreateSomething",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "DeleteSomething",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "UpdateSomething",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "ExternalAPI1",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "ExternalAPI2",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "LoadJSON",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "LoadAuthCookie",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "LoadExternalLibraries",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            },
            {
                name: "SendLog",
                function: promise_util_1.PromiseUtil.generateRandomPromise()
            }
        ];
        // try {
        const result = yield data_util_1.DataUtil.customPromiseAll(listOfPromises, concurrentLimit);
        const expectedResult = {
            GetSomething: { res: "Finished" },
            DeleteSomething: { res: "Finished" },
            UpdateSomething: { res: "Finished" },
            CreateSomething: { res: "Finished" },
            LoadJSON: { res: "Finished" },
            ExternalAPI2: { res: "Finished" },
            LoadExternalLibraries: { res: "Finished" },
            ExternalAPI1: { res: "Finished" },
            LoadAuthCookie: { res: "Finished" },
            SendLog: { res: "Finished" }
        };
        chai_1.expect(result).to.eql(expectedResult);
    }));
});
//# sourceMappingURL=init-test.js.map