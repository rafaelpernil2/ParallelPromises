"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PromiseUtil {
}
exports.PromiseUtil = PromiseUtil;
PromiseUtil.generateRandomPromise = () => {
    return () => {
        return new Promise((resolve, reject) => {
            const time = Math.ceil(Math.random() * 10) * 1000;
            setTimeout(() => {
                // console.log("Promise executed in " + time/1000 + " seconds");
                resolve({ res: "Finished" });
            }, time);
        });
    };
};
//# sourceMappingURL=promise-util.js.map