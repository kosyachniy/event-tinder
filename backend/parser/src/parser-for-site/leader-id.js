let needle = require('needle')
let cheerio = require('cheerio')
let request = require('request')
let fs = require('fs')

let parseText = require('./keyWordsFromText')

let eventDb = require('../controllers/db/event')

let IMG_PATH = '../images/'
let BASE_URL = 'https://leader-id.ru/'
let EVENTS_URL = BASE_URL + 'event/'

let STR_TO_MONTH = {
  января: 1,
  февраля: 2,
  марта: 3,
  апреля: 4,
  мая: 5,
  июня: 6,
  июля: 7,
  августа: 8,
  сентября: 9,
  октября: 10,
  ноября: 11,
  декабря: 12
}

function parseDate(dateString) {
  let date = {}
  let dateArray = dateString.split(' ')

  date.day = dateArray[0]
  date.month = STR_TO_MONTH[dateArray[1]] || 5
  date.year = dateArray[2]

  return date
}

function parseTime(timeString) {
  let timeArray = timeString.split('—')
  let startArray = timeArray[0].trim().split(':')
  let endArray = timeArray[1].trim().split(':')

  let time = {
    start: {
      hour: startArray[0],
      minute: startArray[1]
    },
    end: {
      hour: endArray[0],
      minute: endArray[1]
    }
  }

  return time
}

function parseHtml(html, url) {
  let $ = cheerio.load(html)
  let event = {
    sourceUrl: url.trim()
  }
  let $title = $('.article__intro')
  let $img = $('.article__media-picture')
  let $description = $('.article__content > p')
  let $date = $('p:contains("Дата")')
  let $time = $('p:contains("Время")')
  let $address = $('p:contains("Адрес")')

  if ($title.length) {
    event.title = $title.text().trim()
  }

  if ($img.length) {
    let imgUrl = $img.attr('src') // BASE_URL + 
    let imgUrlSanitized = imgUrl.replace(/[/:]/g, '_')
    let n = imgUrlSanitized.indexOf('?')
    imgUrlSanitized = imgUrlSanitized.substring(0, n != -1 ? n : s.length)
    let imgServerPath = imgUrlSanitized // BASE_URL + 

    request(imgUrl).pipe(fs.createWriteStream(imgServerPath))

    event.img = {
      local: imgUrlSanitized,
      web: $img.attr('src') // BASE_URL + 
    }
  }

  if ($description.length) {
    event.description = $description.text().trim()

    event.tags = parseText(event.description)
  }

  if ($date.length) {
    let dateString = $date
      .text()
      .replace('Дата: ', '')
      .trim()
    event.date = parseDate(dateString)
  }

  if ($time.length) {
    let timeString = $time
      .text()
      .replace('Время: ', '')
      .trim()
    event.time = parseDate(timeString)
  }

  if ($address.length) {
    let addressString = $address
      .text()
      .replace('Адрес: ', '')
      .trim()
    event.address = addressString
  }

  return event
}

async function main() {
  for (let i = 21000; i <= 21131; i++) {
    let url = EVENTS_URL + i + '/'
    let response = await needle('get', url)

    console.log('Начинаю парсить html')
    let event = parseHtml(response.body, url)
    if (event && event.description) {
      eventDb.create(event)
    } else {
      console.log('No description, bad event')
    }
  }
}

if (!fs.existsSync('../images')) {
  fs.mkdirSync('../images')
}

drop = true
if (drop) eventDb.dropCollection()

main()

// db.createUser({
//   user: 'eventTinder',
//   pwd: '9rXTXmSJCXsspCNc',
//   roles: ['readWrite']
// })
