import * as core from '@actions/core'
import {parse} from './parse'

export async function run() {
  const body = core.getInput('body')
  core.debug(body)
  const jsonDict = await parse(body)
  core.setOutput('json', jsonDict)
}

run()
