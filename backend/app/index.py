from flask import request, make_response, current_app, jsonify
from app import app

from mongodb import db


# Междоменные запросы

from datetime import timedelta
from functools import update_wrapper

def crossdomain(origin=None, methods=None, headers=None, max_age=21600,
				attach_to_all=True, automatic_options=True):
	if methods is not None:
		methods = ', '.join(sorted(x.upper() for x in methods))

	# use str instead of basestring if using Python 3.x
	# if headers is not None and not isinstance(headers, basestring):
	# 	headers = ', '.join(x.upper() for x in headers)

	# # use str instead of basestring if using Python 3.x
	# if not isinstance(origin, basestring):
	# 	origin = ', '.join(origin)

	if isinstance(max_age, timedelta):
		max_age = max_age.total_seconds()

	# Determines which methods are allowed
	def get_methods():
		if methods is not None:
			return methods

		options_resp = current_app.make_default_options_response()
		return options_resp.headers['allow']

	# The decorator function
	def decorator(f):
		# Caries out the actual cross domain code
		def wrapped_function(*args, **kwargs):
			if automatic_options and request.method == 'OPTIONS':
				resp = current_app.make_default_options_response()
			else:
				resp = make_response(f(*args, **kwargs))
			if not attach_to_all and request.method != 'OPTIONS':
				return resp

			h = resp.headers
			h['Access-Control-Allow-Origin'] = origin
			h['Access-Control-Allow-Methods'] = get_methods()
			h['Access-Control-Max-Age'] = str(max_age)
			h['Access-Control-Allow-Credentials'] = 'true'
			h['Access-Control-Allow-Headers'] = \
				"Origin, X-Requested-With, Content-Type, Accept, Authorization"
			if headers is not None:
				h['Access-Control-Allow-Headers'] = headers
			return resp

		f.provide_automatic_options = False
		return update_wrapper(wrapped_function, f)
	return decorator


@app.route('/get', methods=['POST', 'OPTIONS'])
@crossdomain(origin='*')
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
			names.add(event['title'])
			events.append(transform(event))

			if len(events) == 15:
				break

	return jsonify({'events': events})