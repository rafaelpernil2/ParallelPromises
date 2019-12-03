# ParallelPromises

[![Actions Status](https://github.com/rafaelpernil2/ParallelPromises/workflows/ci/badge.svg)](https://github.com/rafaelpernil2/ParallelPromises/actions)
[![npm version](https://badge.fury.io/js/parallel-promises.svg)](https://badge.fury.io/js/parallel-promises)
[![](https://badgen.net/badge/icon/TypeScript?icon=typescript&label)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ParallelPromises is an NPM package implemented in Typescript for executing a set of Promises with a given concurrency limit.

This project is inspired by https://itnext.io/node-js-handling-asynchronous-operations-in-parallel-69679dfae3fc

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

## Installation

Install it on your project
```Shell
npm install --save parallel-promises
```

## Usage
**Usage with Typescript**

```typescript
import { customPromiseAll } from 'parallel-promises';

...

const concurrentLimit: number = 5;

const listOfPromises: ICustomPromise[] = [
      {
        name: 'GetSomething',
        function: this.operationWrapper.getSomethingFunction,
        thisArg: this.operationWrapper,
        args: ["firstParamForFunction",{ data: "Another param"}, ["more params..."]]
      },
      {
        name: 'CreateSomething',
        function: this.createSomething,
        thisArg: undefined,
        args: ["firstParamForFunction"]
      },
      {
        name: 'RefreshSomething',
        function: this.updateSomething,
      },
      ...
      ]

      customPromiseAll(listOfPromises, concurrentLimit).then((result: IAnyObject)=>{
          console.log(result);
          //{ GetSomething: { Response: ... }, CreateSomething: "{ Id: 8 }", RefreshSomething: "OK" , ...}
          ...
          // do whatever you want
      });
```

**Usage with Javascript**
```javascript
const ParallelPromises = require('parallel-promises');

...

const concurrentLimit = 5;

const listOfPromises = [
      {
        name: 'GetSomething',
        function: this.operationWrapper.getSomethingFunction,
        thisArg: this.operationWrapper,
        args: ["firstParamForFunction",{ data: "Another param"}, ["more params..."]]
      },
      {
        name: 'CreateSomething',
        function: this.createSomething,
        thisArg: undefined,
        args: ["firstParamForFunction"]
      },
      {
        name: 'RefreshSomething',
        function: this.updateSomething,
      },
      ...
      ]

      ParallelPromises.customPromiseAll(listOfPromises, concurrentLimit).then((result)=>{
          console.log(result);
          //{ GetSomething: { Response: ... }, CreateSomething: "{ Id: 8 }", RefreshSomething: "OK" , ...}
          ...
          // do whatever you want
      });
```

## Contributing
There is no plan regarding contributions in this project
## Credits
This NPM package has been developed by:

**Rafael Pernil Bronchalo** - *Developer*

* [github/rafaelpernil2](https://github.com/rafaelpernil2)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
