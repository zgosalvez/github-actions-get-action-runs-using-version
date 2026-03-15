import * as core from '@actions/core';
import fs from 'node:fs';
import { parse } from 'yaml';

async function run() {
  try {
    const actionFilePath = core.getInput('action-file-path');
    const fileContents = fs.readFileSync(actionFilePath, 'utf8');
    const yamlContents = parse(fileContents);
    const runs = yamlContents['runs'];

    if (runs === undefined) {
      throw Error(`The ${actionFilePath} does not contain a "runs" key.`);
    }

    if (runs === null) {
      throw Error(`The ${actionFilePath} does not contain a value for the "runs" key.`);
    }

    const using = runs['using'];

    if (using === undefined) {
      throw Error(`The ${actionFilePath} does not contain a "using" key.`);
    }

    if (using === null) {
      throw Error(`The ${actionFilePath} does not contain a value for the "runs.using" key.`);
    }

    const firstNumber = using.search(/[0-9]/);
    const version = using.substring(firstNumber);

    core.setOutput('version', version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
