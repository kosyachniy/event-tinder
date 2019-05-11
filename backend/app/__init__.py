from flask import Flask

# from keys import CAPTCHA

app = Flask(__name__)
# app.config.from_object('config')


from app import index