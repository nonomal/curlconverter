import * as util from '../../util.js'

import querystring from 'query-string'
import jsesc from 'jsesc'

const quote = str => jsesc(str, { quotes: 'single' })

export const _toPhpRequests = request => {
  let headerString = false
  if (request.headers) {
    headerString = '$headers = array(\n'
    let i = 0
    const headerCount = request.headers ? request.headers.length : 0
    for (const [headerName, headerValue] of request.headers) {
      headerString += "    '" + headerName + "' => '" + quote(headerValue) + "'"
      if (i < headerCount - 1) {
        headerString += ',\n'
      }
      i++
    }
    headerString += '\n);'
  } else {
    headerString = '$headers = array();'
  }

  let optionsString = false
  if (request.auth) {
    const [user, password] = request.auth
    optionsString = "$options = array('auth' => array('" + user + "', '" + password + "'));"
  }

  let dataString = false
  if (request.data) {
    const parsedQueryString = querystring.parse(request.data, { sort: false })
    dataString = '$data = array(\n'
    const dataCount = Object.keys(parsedQueryString).length
    if (dataCount === 1 && !parsedQueryString[Object.keys(parsedQueryString)[0]]) {
      dataString = "$data = '" + quote(request.data) + "';"
    } else {
      let dataIndex = 0
      for (const key in parsedQueryString) {
        const value = parsedQueryString[key]
        dataString += "    '" + key + "' => '" + quote(value) + "'"
        if (dataIndex < dataCount - 1) {
          dataString += ',\n'
        }
        dataIndex++
      }
      dataString += '\n);'
    }
  }
  let requestLine = '$response = Requests::' + request.method + '(\'' + request.url + '\''
  requestLine += ', $headers'
  if (dataString) {
    requestLine += ', $data'
  }
  if (optionsString) {
    requestLine += ', $options'
  }
  requestLine += ');'

  let phpCode = '<?php\n'
  phpCode += 'include(\'vendor/rmccue/requests/library/Requests.php\');\n'
  phpCode += 'Requests::register_autoloader();\n'
  phpCode += headerString + '\n'
  if (dataString) {
    phpCode += dataString + '\n'
  }
  if (optionsString) {
    phpCode += optionsString + '\n'
  }

  phpCode += requestLine

  return phpCode + '\n'
}
export const toPhpRequests = curlCommand => {
  const request = util.parseCurlCommand(curlCommand)
  return _toPhpRequests(request)
}
