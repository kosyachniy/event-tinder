const fs = require('fs')

truncatedToFull = {}

let keyWords = fs
  .readFileSync('key-words.txt')
  .toString()
  .split('\n')
let truncatedKeyWords = fs
  .readFileSync('key-words-truncated.txt')
  .toString()
  .split('\n')
for (let i = 0; i < keyWords.length; i++) {
  if (truncatedKeyWords[i]) truncatedToFull[truncatedKeyWords[i]] = keyWords[i]
}

function parseText(text) {
  let arr = []
  for (let i = 0; i < truncatedKeyWords.length; i++) {
    if (truncatedKeyWords[i]) {
      let re = new RegExp(truncatedKeyWords[i], 'gi')
      let count = (text.match(re) || []).length
      arr.push([count, truncatedToFull[truncatedKeyWords[i]]])
    }
  }
  arr.sort((a, b) => {
    return a[0] < b[0]
  })

  let result = []
  for (let i = 0; i < 4; i++) {
    if (arr[i][0] > 0) {
      result.push(arr[i][1])
    }
  }
  console.log(result)
  return result
}

module.exports = parseText
