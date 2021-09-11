# GitHub Issue Parser

Use this action to convert issues into a unified JSON structure.

## Setup

```yml
- uses: stefanbuck/github-issue-parser@v1
  id: issue-parser
  with:
    template-path: .github/ISSUE_TEMPLATE/bug-report.yml

- run: echo ${{ toJSON(steps.issue-parser.outputs.jsonString) }} > bug-details.json
```

`template-path` is optional and meant to be used with Issue Forms.

## Example

Given an issue form

```yml
name: Bug
description: Something is broken

title: "Order Pizza"

body:
  - type: input
    id: contact
    attributes:
      label: Your contact details
    validations:
      required: true

  - type: input
    id: what_happened
    attributes:
      label: What happened?
    validations:
      required: true

  - type: input
    id: version
    attributes:
      label: Version
    validations:
      required: true

  - type: input
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
    validations:
      required: true

  - type: checkboxes
    attributes:
      label: What else?
      options:
        - label: Never give up
        - label: Hot Dog is a Sandwich
```

And an issue body

```md
### Your contact details

me@me.com

### What happened?

A bug happened!

### Version

1.0.0

### What browsers are you seeing the problem on?

Chrome, Safari

### What else?

- [x] Never give up
- [ ] Hot Dog is a Sandwich
```

The actions output will be

```json
{
  "contact": "me@me.com",
  "what_happened": "A bug happened!",
  "version": "1.0.0",
  "browsers": "Chrome, Safari",
  "never_give_up": true,
  "hot_dog_is_a_sandwich": false
}
```
