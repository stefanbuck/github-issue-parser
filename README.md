# GitHub Issue Parser

[![GitHub release](https://img.shields.io/github/release/stefanbuck/github-issue-parser.svg)](https://github.com/stefanbuck/github-issue-parser/releases) [![snyk](https://snyk.io/test/github/stefanbuck/github-issue-parser/badge.svg?targetFile=package.json)](https://snyk.io/test/github/stefanbuck/github-issue-parser?targetFile=package.json)

Use this action to convert issues into a unified JSON structure. Read the [Codeless Contributions with GitHub Issue Forms](https://stefanbuck.com/blog/codeless-contributions-with-github-issue-forms) post on my blog.

## Setup

```yml
- uses: stefanbuck/github-issue-parser@v3
  id: issue-parser
  with:
    template-path: .github/ISSUE_TEMPLATE/bug-report.yml # optional but recommended

- run: cat ${HOME}/issue-parser-result.json

- run: echo $FAVORITE_DISH
  env:
    FAVORITE_DISH: ${{ steps.issue-parser.outputs.issueparser_favorite_dish }}
```

## Example

Given an issue form

```yml
body:
  - type: input
    id: favorite_dish
    attributes:
      label: What's your favorite dish?
    validations:
      required: true

  - type: checkboxes
    id: favorite_color
    attributes:
      label:  What's your preferred color?
      options:
        - label: Red
        - label: Green
        - label: Blue
```

And an issue body

```md
### What's your favorite dish?

Pizza

### What's your preferred color?

- [x] Red
- [ ] Green
- [x] Blue
```

The actions output will be

```json
{
  "favorite_dish": "Pizza",
  "favorite_color": ["Red", "Blue"]
}
```

## Action outputs

- `jsonString` - The entire output
- `issueparser_<field_id>` - Access individual values


Please take a look at GitHub's [Good practices for mitigating script injection attacks](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#good-practices-for-mitigating-script-injection-attacks) when using inline scripts. The examples blow are safe because they use intermediate environment variable as suggested by GitHub.

```yaml
- run: echo $JSON_STRING > output.json
  env:
    JSON_STRING: ${{ steps.issue-parser.outputs.jsonString }}
```


```yaml
- run: echo $FAV_DISH
  env:
    FAV_DISH: ${{ steps.issue-parser.outputs.issueparser_favorite_dish }}
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
