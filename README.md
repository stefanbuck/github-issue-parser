# GitHub Issue Parser

Use this action to convert issues into a unified JSON structure.

## Setup

```yml
- uses: stefanbuck/github-issue-praser@main
  id: issue-parser
  with:
    template-path: .github/ISSUE_TEMPLATE/bug-report.yml

- run: echo ${{ toJSON(steps.issue-parser.outputs.jsonString) }} > bug-details.json
```

`template-path` is optional and meant to be used with Issue Forms.

## Example

```md
### Your contact details

tomato@ilikepizza.com

### What happened?

A bug happened!

### Version

1.0.0

### What browsers are you seeing the problem on?

Chrome, Safari

### Code of Conduct

- [X] Never give up
- [] Hot Dog is a Sandwich
```


```json
{
    "contact": "me@me.com",
    "what_happened": "a bug happened!",
    "version": "1.0.0",
    "browsers": "chrome, safari",
    "never_give_up": true,
    "hot_dog_is_a_sandwich": false
}
```