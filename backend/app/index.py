from flask import request, jsonify
from app import app

from mongodb import db


@app.route('/get', methods=['POST'])
def get():
	x = request.json

	db_condition = {
		'id': x['id'] if 'id' in x else None,
	}

	db_filter = {
		'_id': False,
		'__v': False,
		'createdAt': False,
	}

	months = (
			  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
			  'августа', 'сентября', 'октября', 'ноября', 'декабря'
	)

	def transform(el):
		try:
			month = months[int(el['date']['month'])]
		except:
			month = 0

		return {
			'name': el['title'],
			'location': el['address'],
			'time': '{} {}'.format(el['date']['day'], month),
			'link': el['img']['web'],
		}

	# events = list(map(transform, db['events'].find(db_condition, db_filter)[:15]))

	events = []
	names = set()

	for event in db['events'].find(db_condition, db_filter):
		if event['title'] not in names and len(event['title']) < 50:
			if 'search' in x and x['search']:
				search = x['search'].lower()
				text = (' ' + event['title'] + event['description']).lower()
				print(search, text)
				if not text.index(search):
					continue

			names.add(event['title'])
			events.append(transform(event))

			if 'count' in x and len(events) == x['count']:
				break

	return jsonify({'events': events})