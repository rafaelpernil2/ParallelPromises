import { DataUtil } from "./utils/data-util";
import { PromiseUtil } from "./utils/promise-util";

const concurrentLimit = 3;

let listOfPromises = [
    {
        name: "GetSomething",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "CreateSomething",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "DeleteSomething",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "UpdateSomething",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "ExternalAPI1",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "ExternalAPI2",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "LoadJSON",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "LoadAuthCookie",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "LoadExternalLibraries",
        function: PromiseUtil.generateRandomPromise()
    },
    {
        name: "SendLog",
        function: PromiseUtil.generateRandomPromise()
    },
]

DataUtil.customPromiseAll(listOfPromises, concurrentLimit);