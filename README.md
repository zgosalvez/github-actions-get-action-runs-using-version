# GitHub Action — Get the GitHub Action runs.using Version

This GitHub Action (written in composite run steps) allows you to leverage GitHub Actions to get the [runs.using](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runs) version from the Action metadata file. This is primarily used before using the [setup-node action](https://github.com/marketplace/actions/setup-node-js-environment) when testing GitHub Actions.

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#common-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
For more information on this input, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith)

* `action-file-path`: The action.yml file path. Optional. Default: `action.yml`

### Outputs
For more information on this output, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idoutputs) and the [Context and expression syntax for GitHub Actions](https://docs.github.com/actions/reference/context-and-expression-syntax-for-github-actions#steps-context)

* `version`: The runs.using version. For example, `16` for `node16`

### Common workflow

1. Your `action.yml` file must contain the version under the `runs:using:` key. For example:
```yaml
runs:
  using: 'node16'
```
2. Use the action's output as an input to [setup-node action](https://github.com/marketplace/actions/setup-node-js-environment). For example:
```yaml
on: push

name: Sample Workflow

jobs:
  build:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Get runs.using version
        id: get-runs-using-version
        uses: zgosalvez/github-actions-get-action-runs-using-version@v1
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: ${{ steps.get-runs-using-version.outputs.version }}
```

### GitHub Action Workflows

This is used in the CI workflows of my [GitHub Actions](https://github.com/zgosalvez?tab=repositories&q=github-actions-) repositories, including this one.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE.md)
