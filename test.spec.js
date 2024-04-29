const { readFileSync } = require("fs");

const { run } = require(".");

it("smoke test", () => {
  expect(run).toBeDefined();
  expect(typeof run).toBe("function");
});

it("readme example", () => {
  const expectedOutput = require("./fixtures/readme-example/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  // mock ENV
  const env = {
    HOME: "<home path>",
  };

  // mock event payload
  const eventPayload = require("./fixtures/readme-example/issue");

  // mock fs
  const fs = {
    readFileSync(path, encoding) {
      expect(path).toBe("<template-path>");
      expect(encoding).toBe("utf8");
      return readFileSync("fixtures/readme-example/form.yml", "utf-8");
    },
    writeFileSync(path, content) {
      expect(path).toBe("<home path>/issue-parser-result.json");
      expect(content).toBe(expectedOutputJson);
    },
  };

  // mock core
  const core = {
    getInput: jest.fn(() => '<template-path>'),
    setOutput: jest.fn(),
  };

  run(env, eventPayload, fs, core);
  expect(core.getInput).toHaveBeenCalledWith('template-path')
  expect(core.setOutput).toHaveBeenCalledWith('jsonString', JSON.stringify(expectedOutput, null, 2))
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_favorite_dish', 'Pizza')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_favorite_color', 'Red,Blue')
  expect(core.setOutput.mock.calls.length).toBe(3)
});

it("full example", () => {
  const expectedOutput = require("./fixtures/full-example/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  // mock ENV
  const env = {
    HOME: "<home path>",
  };

  // mock event payload
  const eventPayload = require("./fixtures/full-example/issue");

  // mock fs
  const fs = {
    readFileSync(path, encoding) {
      expect(path).toBe("<template-path>");
      expect(encoding).toBe("utf8");
      return readFileSync("fixtures/full-example/form.yml", "utf-8");
    },
    writeFileSync(path, content) {
      expect(path).toBe("<home path>/issue-parser-result.json");
      expect(content).toBe(expectedOutputJson);
    },
  };

  // mock core
  const core = {
    getInput: jest.fn(() => '<template-path>'),
    setOutput: jest.fn(),
  };

  run(env, eventPayload, fs, core);
  expect(core.getInput).toHaveBeenCalledWith('template-path')
  expect(core.setOutput).toHaveBeenCalledWith('jsonString', JSON.stringify(expectedOutput, null, 2))
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_contact', 'me@me.com')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_what_happened', 'A bug happened!')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_version', '1.0.0')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_browsers', 'Chrome, Safari')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_anything_else', 'Never give up')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_second_anything_else', 'Hot Dog is a Sandwich,Another item')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_checkbox_without_an_id', '')
  expect(core.setOutput.mock.calls.length).toBe(8)
});

it("mismatched parsing", () => {
  const expectedOutput = require("./fixtures/mismatched-parsing/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  // mock ENV
  const env = {
    HOME: "<home path>",
  };

  // mock event payload
  const eventPayload = require("./fixtures/mismatched-parsing/issue");

  // mock fs
  const fs = {
    readFileSync(path, encoding) {
      expect(path).toBe("<template-path>");
      expect(encoding).toBe("utf8");
      return readFileSync("fixtures/mismatched-parsing/form.yml", "utf-8");
    },
    writeFileSync(path, content) {
      expect(path).toBe("<home path>/issue-parser-result.json");
      expect(content).toBe(expectedOutputJson);
    },
  };

  // mock core
  const core = {
    getInput: jest.fn(() => '<template-path>'),
    setOutput: jest.fn(),
  };

  run(env, eventPayload, fs, core);
  expect(core.getInput).toHaveBeenCalledWith('template-path')
  expect(core.setOutput).toHaveBeenCalledWith('jsonString', JSON.stringify(expectedOutput, null, 2))
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_your_contact_details', 'me@me.com')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_what_happened', 'A bug happened!')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_version', '1.0.0')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_what_browsers_are_you_seeing_the_problem_on', 'Chrome, Safari')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_what_else', 'Never give up')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_and_with_that', 'Hot Dog is a Sandwich,Another item')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_checkbox_without_an_id', '')
  expect(core.setOutput.mock.calls.length).toBe(8)
});

it("multiple paragraphs", () => {
  const expectedOutput = require("./fixtures/multiple-paragraphs/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  // mock ENV
  const env = {
    HOME: "<home path>",
  };

  // mock event payload
  const eventPayload = require("./fixtures/multiple-paragraphs/issue");

  // mock fs
  const fs = {
    readFileSync(path, encoding) {
      expect(path).toBe("<template-path>");
      expect(encoding).toBe("utf8");
      return readFileSync("fixtures/multiple-paragraphs/form.yml", "utf-8");
    },
    writeFileSync(path, content) {
      expect(path).toBe("<home path>/issue-parser-result.json");
      expect(content).toBe(expectedOutputJson);
    },
  };

  // mock core
  const core = {
    getInput: jest.fn(() => '<template-path>'),
    setOutput: jest.fn(),
  };

  run(env, eventPayload, fs, core);

  expect(core.getInput).toHaveBeenCalledWith('template-path')
  expect(core.setOutput).toHaveBeenCalledWith('jsonString', JSON.stringify(expectedOutput, null, 2))
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_textarea-one', '1st paragraph\n\n2nd paragraph')
  expect(core.setOutput).toHaveBeenCalledWith('issueparser_textarea-two', '1st paragraph\n2nd paragraph')
  expect(core.setOutput.mock.calls.length).toBe(3)
});

it("blank", () => {
  const expectedOutput = require("./fixtures/blank/expected.json");
  const expectedOutputJson = JSON.stringify(expectedOutput, null, 2);

  // mock ENV
  const env = {
    HOME: "<home path>",
  };

  // mock event payload
  const eventPayload = null;

  // mock fs
  const fs = {
    readFileSync(path, encoding) {
      expect(path).toBe("<template-path>");
      expect(encoding).toBe("utf8");
      return readFileSync("fixtures/blank/form.yml", "utf-8");
    },
    writeFileSync(path, content) {
      expect(path).toBe("<home path>/issue-parser-result.json");
      expect(content).toBe(expectedOutputJson);
    },
  };

  // mock core
  const core = {
    getInput(inputName) {
      expect(inputName).toBe("template-path");
      return "<template-path>";
    },
    setOutput(outputName, outputValue) {
      if (outputName === "jsonString") {
        expect(outputValue).toBe(expectedOutputJson);
        return;
      }

      if (outputName.startsWith("issueparser_")) {
        const key = outputName.substr("issueparser_".length);
        expect(Object.keys(expectedOutput)).toContain(key);

        expect(outputValue).toBe(expectedOutput[key]);
        return;
      }
    },
  };

  run(env, eventPayload, fs, core);
});
