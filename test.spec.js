import {parse} from './parse'
import {readFileSync} from 'fs'

it("readme example", async () => {
  const expectedOutput = require("./fixtures/readme-example/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  const body = readFileSync("./fixtures/readme-example/issue-body.md").toString();

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson);
});

// it("model example", () => {
//   const expectedOutput = require("./fixtures/model-example/expected.json");
//   const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

//   // mock ENV
//   const env = {
//     HOME: "<home path>",
//   };

//   // mock event payload
//   const eventPayload = require("./fixtures/model-example/issue");

//   // mock fs
//   const fs = {
//     readFileSync(path, encoding) {
//       expect(path).toBe("<template-path>");
//       expect(encoding).toBe("utf8");
//       return readFileSync("fixtures/model-example/form.yml", "utf-8");
//     },
//     writeFileSync(path, content) {
//       expect(path).toBe("<home path>/issue-parser-result.json");
//       expect(content).toBe(expectedOutputJson);
//     },
//   };

//   // mock core
//   const core = {
//     getInput(inputName) {
//       expect(inputName).toBe("template-path");
//       return "<template-path>";
//     },
//     setOutput(outputName, outputValue) {
//       if (outputName === "jsonString") {
//         expect(outputValue).toBe(expectedOutputJson);
//         return;
//       }

//       if (outputName.startsWith("issueparser_")) {
//         const key = outputName.substr("issueparser_".length);
//         expect(Object.keys(expectedOutput)).toContain(key);

//         expect(outputValue).toBe(expectedOutput[key]);
//         return;
//       }
//     },
//   };

//   run(env, eventPayload, fs, core);
// });

// it("multiple paragraphs", () => {
//   const expectedOutput = require("./fixtures/multiple-paragraphs/expected.json");
//   const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

//   // mock ENV
//   const env = {
//     HOME: "<home path>",
//   };

//   // mock event payload
//   const eventPayload = require("./fixtures/multiple-paragraphs/issue");

//   // mock fs
//   const fs = {
//     readFileSync(path, encoding) {
//       expect(path).toBe("<template-path>");
//       expect(encoding).toBe("utf8");
//       return readFileSync("fixtures/multiple-paragraphs/form.yml", "utf-8");
//     },
//     writeFileSync(path, content) {
//       expect(path).toBe("<home path>/issue-parser-result.json");
//       expect(content).toBe(expectedOutputJson);
//     },
//   };

//   // mock core
//   const core = {
//     getInput(inputName) {
//       expect(inputName).toBe("template-path");
//       return "<template-path>";
//     },
//     setOutput(outputName, outputValue) {
//       if (outputName === "jsonString") {
//         expect(outputValue).toBe(expectedOutputJson);
//         return;
//       }

//       if (outputName.startsWith("issueparser_")) {
//         const key = outputName.substr("issueparser_".length);
//         expect(Object.keys(expectedOutput)).toContain(key);

//         expect(outputValue).toBe(expectedOutput[key]);
//         return;
//       }
//     },
//   };

//   run(env, eventPayload, fs, core);
// });

// it("blank", () => {
//   const expectedOutput = require("./fixtures/blank/expected.json");
//   const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

//   // mock ENV
//   const env = {
//     HOME: "<home path>",
//   };

//   // mock event payload
//   const eventPayload = require("./fixtures/blank/issue");

//   // mock fs
//   const fs = {
//     readFileSync(path, encoding) {
//       expect(path).toBe("<template-path>");
//       expect(encoding).toBe("utf8");
//       return readFileSync("fixtures/blank/form.yml", "utf-8");
//     },
//     writeFileSync(path, content) {
//       expect(path).toBe("<home path>/issue-parser-result.json");
//       expect(content).toBe(expectedOutputJson);
//     },
//   };

//   // mock core
//   const core = {
//     getInput(inputName) {
//       expect(inputName).toBe("template-path");
//       return "<template-path>";
//     },
//     setOutput(outputName, outputValue) {
//       if (outputName === "jsonString") {
//         expect(outputValue).toBe(expectedOutputJson);
//         return;
//       }

//       if (outputName.startsWith("issueparser_")) {
//         const key = outputName.substr("issueparser_".length);
//         expect(Object.keys(expectedOutput)).toContain(key);

//         expect(outputValue).toBe(expectedOutput[key]);
//         return;
//       }
//     },
//   };

//   run(env, eventPayload, fs, core);
// });
