const fs = require('fs')
let stackTrace = require('stack-trace')
import toLower from './toLower'
import toUpper from './toUpper'

//
// Name
//
let fileCache = {}

export { toLower }
export { toUpper }

export function Name() {
  let stack = stackTrace.get()
  let callSite = getCallSite(stack)
  let lineNumber = callSite.getLineNumber()
  let fileName = callSite.getFileName()

  if (!fileCache[fileName]) {
    fileCache[fileName] = fs.readFileSync(fileName, 'utf8').match(/^.*((\r\n|\n|\r)|$)/gm)
  }

  let nameLine = fileCache[fileName][lineNumber - 1]
  let name = nameLine.split('=')[0].trim()
  name = name.split('.')[1]

  return toLower(name)
}

export function FileName() {
  let stack = stackTrace.get()
  let callSite = getCallSite(stack)
  let lineNumber = callSite.getLineNumber()
  let fileName = callSite.getFileName()

  return fileName
}

function getCallSite(stackLines) {
  for (let i = 0; i < stackLines.length; i++) {
    let line = stackLines[i].getFileName()
    if (line.indexOf('declarations') !== -1) return stackLines[i]
  }

  return ''
}
