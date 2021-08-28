const fs = require('fs');
const yaml = require('js-yaml');
const core = require('@actions/core');
const eventPayload = require(process.env.GITHUB_EVENT_PATH)

let form = {};
try {
  const templatePath = core.getInput('template-path');
  if (templatePath) {
      form = yaml.load(fs.readFileSync(templatePath, 'utf8'));
  }
} catch (err) {
    core.error(err)
}

function getIDsFromIssueTemplate(formTemplate) {
    if (!formTemplate.body) {
        return {}
    }

    return  Object.fromEntries(formTemplate.body.map(item => {
        if (item.type === 'markdown') {
            return null;
        }
        return [item.attributes.label, item.id]
    }).filter(Boolean));
}

let result;
const body = eventPayload.issue.body;
const idMapping = getIDsFromIssueTemplate(form)

function toKey(str) {
    if (idMapping[str]) {
        return idMapping[str].replace(/-/g,'_');
    }

    return str.toLowerCase().trim().replace(/[^\w\s]/gi,'').replace(/\s/g,'_');
}
function toValue(val) {
    if (typeof val !== 'string') {
        return val;
    }

    const value = val.trim();
    if (value.toLowerCase() === '_no response_') {
        return '';
    }
    return value;
}

result = body.trim().split('###').filter(Boolean).map(line => {
    return line.split(/\r?\n\r?\n/).filter(Boolean).map(item => {
        const line = item.trim();
        if (line.startsWith('- [')) {
            return line.split(/\r?\n/).map(check => {
                const field = check.replace(/- \[[X\s]\]\s+/i, '');
                return [`${field}`, check.toUpperCase().startsWith('- [X] ')]
            })
        }

        return line;
    })
})
.reduce((prev, curr) => {

    if (Array.isArray(curr[1])) {
        return [...prev, ...curr[1]];
    }

    return [...prev, curr];
}, []).map(([key, ...lines]) => {

    const checkListValue = lines.find(line => Array.isArray(line));
    const value = checkListValue ? toValue(checkListValue) : toValue(...lines)
    
    return [toKey(key), value];
})

result.forEach(([key, value]) => {
    core.setOutput(`issueparser_${key}`, value);
})

function jsonStringify(json) {
	return JSON.stringify(json);
}


const json = Object.fromEntries(result)

fs.writeFileSync(`${process.env.HOME}/issue-parser-result.json`, jsonStringify(json), 'utf-8');
core.setOutput('jsonString', jsonStringify(json));
