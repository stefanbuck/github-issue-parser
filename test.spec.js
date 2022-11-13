import {parse} from './parse'
import {readFileSync} from 'fs'

it("readme example", async () => {
  const expectedOutput = require("./fixtures/readme-example/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  const body = readFileSync("./fixtures/readme-example/issue-body.md").toString();

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson);
});

it("multi paragraph", async () => {
  const expectedOutput = require("./fixtures/multiple-paragraphs/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  const body = readFileSync("./fixtures/multiple-paragraphs/issue-body.md").toString();

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson);
});

it("model example raw string", async () => {
  const expectedOutput = require("./fixtures/model-example/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  const body = "### Model Name\r\n\r\nmy cool molecule\r\n\r\n### Model Description\r\n\r\nThis is a prediction for a super cool molecule\r\n\r\n### Ersilia ID\r\n\r\neos11aa\r\n\r\n### Publication\r\n\r\nThe following link is just an example:\r\n\r\nwww.example.com\r\n\r\n### Code\r\n\r\n_No response_\r\n\r\n### License\r\n\r\n_No response_"

  const jsonDict = await parse(body)

  expect(jsonDict).toEqual(expectedOutputJson);
});
