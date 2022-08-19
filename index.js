// @ts-check

const fs = require("fs");
const yaml = require("js-yaml");
const core = require("@actions/core");

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {{issue: { body: string}}} eventPayload
 * @param {fs} fs
 * @param {core} core
 */
async function run(env, eventPayload, fs, core) {
  let form = {};
  try {
    const templatePath = core.getInput("template-path");
    if (templatePath) {
      form = yaml.load(fs.readFileSync(templatePath, "utf8"));
    }
  } catch (err) {
    core.error(err);
  }

  function getIDsFromIssueTemplate(formTemplate) {
    if (!formTemplate.body) {
      return {};
    }

    return Object.fromEntries(
      formTemplate.body
        .map((item) => {
          if (item.type === "markdown") {
            return null;
          }
          return [item.attributes.label, item.id, item.type];
        })
        .filter(Boolean)
    );
  }

  function getIDTypesFromIssueTemplate(formTemplate) {
    if (!formTemplate.body) {
      return {};
    }

    return Object.fromEntries(
      formTemplate.body
        .map((item) => {
          if (item.type === "markdown") {
            return null;
          }
          return [toKey(item.attributes.label), item.type];
        })
        .filter(Boolean)
    );
  }

  let result;
  const body = eventPayload.issue.body || '';
  const idMapping = getIDsFromIssueTemplate(form);
  const idTypes = getIDTypesFromIssueTemplate(form);

  function toKey(str) {
    if (idMapping[str]) {
      return idMapping[str];
    }

    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s/g, "_");
  }
  function toValue(input, ...extraLines) {
    if (typeof input !== "string") {
      return input;
    }

    const value = [input, ...extraLines].join("\n\n").trim();

    if (value.toLowerCase() === "_no response_") {
      return "";
    }
    return value;
  }

  //toObject merges checkbox results in an array and spits out correctly formatted object
  function toObject(array) {
    let result = {};

    array.forEach((item) => {
      const key = item && item[0];
      const value = item && item[1];

      if (key in result) {
        const content = result[key];

        if (value !== undefined) {
          result[key] = content.concat(value);
        }
        return;
      }

      if (idTypes[key] == "checkboxes") {
        result[key] = value === undefined ? [] : [value];
      } else {
        result[key] = value;
      }
    });

    return result
  }

  result = body
    .trim()
    .split("###")
    .filter(Boolean)
    .map((line) => {
      return line
        .split(/\r?\n\r?\n/)
        .filter(Boolean)
        .map((item, index, arr) => {
          const line = item.trim();

          if (line.startsWith("- [")) {
            return line.split(/\r?\n/).map((check) => {
              const field = check.replace(/- \[[X\s]\]\s+/i, "");
              const previousIndex = index === 0 ? index : index - 1;
              const key = arr[previousIndex].trim();
              if (check.toUpperCase().startsWith("- [X] ")) {
                return [key, field];
              }
              return [key];
            });
          }

          return line;
        });
    })
    .reduce((prev, curr) => {
      if (Array.isArray(curr[1])) {
        return [...prev, ...curr[1]];
      }

      return [...prev, curr];
    }, []);

  result = result.map(([key, ...lines]) => {
    const checkListValue = lines.find((line) => Array.isArray(line));
    const value = checkListValue ? toValue(checkListValue) : toValue(...lines);

    return [toKey(key), value];
  });

  result = toObject(result);
  Object.entries(result).forEach(([key, value]) => {
    core.setOutput(`issueparser_${key}`, Array.isArray(value) ? value.join(',') : value);
  })

  function jsonStringify(json) {
    return JSON.stringify(json, null, 2);
  }

  fs.writeFileSync(
    `${env.USERPROFILE || env.HOME}/issue-parser-result.json`,
    jsonStringify(result),
    "utf-8"
  );
  core.setOutput("jsonString", jsonStringify(result));
}

// We wrap the code in a `run` function to enable testing.
// On GitHub Actions the `run` function is executed immediately.
// `NODE_ENV` is set when running tests on GitHub Actions as part of CI.
if (process.env.GITHUB_ACTIONS && process.env.NODE_ENV !== "test") {
  const eventPayload = require(process.env.GITHUB_EVENT_PATH);

  run(process.env, eventPayload, fs, core, yaml);
}

module.exports.run = run;
