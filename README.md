# GitHub Issue Parser

[![GitHub release](https://img.shields.io/github/release/stefanbuck/github-issue-parser.svg)](https://github.com/stefanbuck/github-issue-parser/releases) [![snyk](https://snyk.io/test/github/stefanbuck/github-issue-parser/badge.svg?targetFile=package.json)](https://snyk.io/test/github/stefanbuck/github-issue-parser?targetFile=package.json)

Use this action to convert issues into a unified JSON structure.

## Setup

```yml
- uses: stefanbuck/github-issue-parser@v2
  id: issue-parser
  with:
    template-path: .github/ISSUE_TEMPLATE/bug-report.yml

- run: echo '${{ steps.issue-parser.outputs.jsonString }}' > bug-details.json

- run: echo '${{ steps.issue-parser.outputs.issueparser_your_contact_details }}'
```

`template-path` is optional and meant to be used with Issue Forms.

The text to be parsed can be set explicitly using `issue-body` input, otherwise it can be left to use the default value of `${{ github.event.issue.body }}`.

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


Want to learn more about this concept? Check out the [Codeless Contributions with GitHub Issue Forms](https://stefanbuck.com/blog/codeless-contributions-with-github-issue-forms) post on my blog.


## Real-world examples

### Basic example

Ever wanted to order a pizza from a GitHub Issue? In this basic example, the order is processed and appended to the README using this Action.

[See workflow](https://github.com/stefanbuck/ristorante/blob/main/.github/workflows/order.yml)

### Awesome list

The [awesome-browser-extensions-for-github](https://github.com/stefanbuck/awesome-browser-extensions-for-github) repository is using this Action to make it super easy to submit a new extension just by filling a new GitHub Issue. The workflow runs and turns the issue into a code contribution once the label `merge` has been added.

[See workflow](https://github.com/stefanbuck/awesome-browser-extensions-for-github/blob/main/.github/workflows/handle-submission.yml)

### Advanced Issue Labeler

The [advanced-issue-labeler](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler) GitHub Action enables policy-based issue labeling. With the power of GitHub Issue forms and `github-issue-parser`, it provides a secure way to label issues to help with the triaging process automatically.

[How to use it](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler#usage)
