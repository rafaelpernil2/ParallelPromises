"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_util_1 = require("./utils/data-util");
const promise_util_1 = require("./utils/promise-util");
const concurrentLimit = 3;
const listOfPromises = [
    {
        name: "GetSomething",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "CreateSomething",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "DeleteSomething",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "UpdateSomething",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "ExternalAPI1",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "ExternalAPI2",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "LoadJSON",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "LoadAuthCookie",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "LoadExternalLibraries",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
    {
        name: "SendLog",
        function: promise_util_1.PromiseUtil.generateRandomPromise(),
    },
];
data_util_1.DataUtil.customPromiseAll(listOfPromises, concurrentLimit);
//# sourceMappingURL=index.js.map