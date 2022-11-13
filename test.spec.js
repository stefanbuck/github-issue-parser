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
