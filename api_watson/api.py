# API
# Sistem Libs
import os
import json
import logging
import requests

# API Libs
import flask
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv
from flask_api import status

# Watson Libs
from jsonschema import validate, ValidationError
from ibm_watson import AssistantV2, ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from flask import jsonify

# MongoDB Libs
import pymongo
from pprint import pprint
import uuid
#import dnspython

# Twilio Libs
from twilio.rest import Client as Twilio

# Load .env file
load_dotenv()

# MongoDB Config
uri = "mongodb+srv://roberto:" + os.getenv("password") + "@cluster0.bgu8x.mongodb.net/robertoyoc?retryWrites=true&w=majority"
client = pymongo.MongoClient(uri)
db = client.robertoyoc

# API Config
app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Watson Config
assistant_api_key = os.getenv("assistant_api_key")
request_data = {
            "assistant_api_key": os.getenv("assistant_api_key"),
            "assistant_url": os.getenv("assistant_url"),
            "assistant_version": os.getenv("assistant_version"),
            "assistant_id": os.getenv("assistant_id"),
            "assistant_id_whatsapp": os.getenv("assistant_id_whatsapp")
        } 

# Twilio Config

client_twilio = Twilio(os.getenv("account_sid"), os.getenv("auth_token"))

# Create Session for watson assistant for WEB Channel
def watson_create_session():
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
 
    try:
        watson_session = assistant.create_session(
            assistant_id=request_data.get("assistant_id")
        ).get_result()
        watson_session_id = watson_session["session_id"]
    except KeyError:
        _logger.error("The session wasn't created")
        return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    return watson_session_id

# Create a Session for Watson assistant WhatsApp Channel
def watson_create_session_whatsapp():
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
 
    try:
        watson_session = assistant.create_session(
            assistant_id=request_data.get("assistant_id_whatsapp")
        ).get_result()
        watson_session_id = watson_session["session_id"]
    except KeyError:
        _logger.error("The session wasn't created")
        return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    return watson_session_id

#Give a response for WEB Channel
def watson_response(session_id, message):
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    context = request_data.get('context') if 'context' in request_data else {}
    watson_session_id = session_id

    try:
        watson_response = assistant.message(
            assistant_id=request_data.get('assistant_id'),
            session_id=watson_session_id,
            input={
                'message_type': 'text',
                'text': message,
                'options': {
                    'return_context': True
                }
            },
            context=context
        ).get_result()
    except ValueError as ex:
        _logger.error("Value error: %s", ex)
        return jsonify({'error': "Value error"}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except ApiException:
        try:
            watson_session = assistant.create_session(
                assistant_id=request_data.get("assistant_id")
            ).get_result()
            watson_session_id = watson_session["session_id"]

            watson_response = assistant.message(
                assistant_id=request_data.get('assistant_id'),
                session_id=watson_session_id,
                input={
                    'message_type': 'text',
                    'text': message,
                    'options': {
                        'return_context': True
                    }
                },
                context=context
            ).get_result()
        except KeyError:
            _logger.error("The session wasn't created")
            return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    try:
        del watson_response["context"]["global"]["session_id"]
    except:
        pass

    response = {
        "response": watson_response,
        "session_id": watson_session_id
    }

    if(len(response.get('response').get('output').get('intents')) > 0):
        return {
            'text': response.get('response').get('output').get('generic')[0].get('text'),
            'intent': response.get('response').get('output').get('intents')[0].get('intent')
        }
    else:
        return {
            'text': 'Lo siento, no entendi tu mensaje, por favor intenta de nuevo',
            'intent': 'none'
        }

# Give a response for WhatsApp Channel
def watson_response_whatsapp(session_id, message):
    iam_apikey = request_data.get("assistant_api_key")
    assistant_url = request_data.get("assistant_url")
    assistant_version = request_data.get('assistant_version')

    assistant = watson_instance(iam_apikey, assistant_url, assistant_version)
    context = request_data.get('context') if 'context' in request_data else {}
    watson_session_id = session_id

    try:
        watson_response = assistant.message(
            assistant_id=request_data.get('assistant_id_whatsapp'),
            session_id=watson_session_id,
            input={
                'message_type': 'text',
                'text': message,
                'options': {
                    'return_context': True
                }
            },
            context=context
        ).get_result()
    except ValueError as ex:
        _logger.error("Value error: %s", ex)
        return jsonify({'error': "Value error"}), status.HTTP_500_INTERNAL_SERVER_ERROR
    except ApiException:
        try:
            watson_session = assistant.create_session(
                assistant_id=request_data.get("assistant_id_whatsapp")
            ).get_result()
            watson_session_id = watson_session["session_id"]

            watson_response = assistant.message(
                assistant_id=request_data.get('assistant_id_whatsapp'),
                session_id=watson_session_id,
                input={
                    'message_type': 'text',
                    'text': message,
                    'options': {
                        'return_context': True
                    }
                },
                context=context
            ).get_result()
        except KeyError:
            _logger.error("The session wasn't created")
            return jsonify({"error": "Error creating the session"}), status.HTTP_503_SERVICE_UNAVAILABLE

    try:
        del watson_response["context"]["global"]["session_id"]
    except:
        pass

    response = {
        "response": watson_response,
        "session_id": watson_session_id
    }

    if(len(response.get('response').get('output').get('intents')) > 0):
        return {
            'text': response.get('response').get('output').get('generic')[0].get('text'),
            'intent': response.get('response').get('output').get('intents')[0].get('intent')
        }
    else:
        return {
            'text': 'Lo siento, no entendi tu mensaje, por favor intenta de nuevo',
            'intent': 'none'
        }

# Define Watson Instance
def watson_instance(iam_apikey: str, url: str, version: str = "2019-02-28") -> AssistantV2:
    try:
        authenticator = IAMAuthenticator(iam_apikey)
        assistant = AssistantV2(
            authenticator=authenticator,
            version=version
        )
        assistant.set_service_url(url)
    except ApiException as error:
        _logger.error("%s - %s", error.code, error.message)
        return jsonify({'error': str(error.message)}), error.code

    return assistant

# Fetch Watson messages from MongoDB
def getWatson():
    watson_collection = db.watsons.find({})
    res = []
    for item in watson_collection:
        res.append({
            "intent": item.get("intent"),
            "message": item.get("message"),
            "user": item.get("user"),
            "channel": item.get("channel")
        })
    return res

# Create a new MongoDB Message
def postWatson(message, user):
    try: 
        result = watson_response(watson_create_session(), message) #return text and intent as json
        response = db.watsons.insert_one({
            "intent": result.get("intent"),
            "message": result.get("text"),
            "user": user,
            "channel": "web"
        })
        return {
            "intent": result.get("intent"),
            "message": result.get("text"),
            "user": user,
            "channel": "web"
        }
    except:
        return "Error"

# Send a message to user by whatsApp
def twilioWhatsApp(req):
    result = watson_response_whatsapp(watson_create_session_whatsapp(), request.form.get('Body')) #return text and intent as json
    print(result)
    db.whatsapps.insert_one({
        "intent": result.get("intent"),
        "message": request.form.get('Body'),
        "response": result.get("text"),
        "user": request.form.get('From'),
        "channel": "whatsapp"
    })
    message = client_twilio.messages.create( 
        from_='whatsapp:+' + os.getenv("from"),  
        body=result.get("text"),
        to='whatsapp:+' + os.getenv("to")
        #to=request.form.get('From')
    )
    print(message.sid)
    return message.sid

def create_course(name, description, image, bg):
    response = db.courses.insert_one({
        "course_id": str(uuid.uuid4()),
        "name": name,
        "description": description,
        "image": image,
        "bg": bg
    })
    return {
        "course_id": str(uuid.uuid4()),
        "name": name,
        "description": description,
        "image": image,
        "bg": bg
    }

def get_courses():
    courses = db.courses.find({})
    res = []
    for item in courses:
        res.append({
            "course_id": item.get("course_id"),
            "name": item.get("name"),
            "description": item.get("description"),
            "image": item.get("image"),
            "bg": item.get("bg")
        })
    return res

def get_course(id):
    try:
        response = db.courses.find({ "course_id": id })
        return {
            "name": response[0].get("name"),
            "description": response[0].get("description"),
            "image": response[0].get("image"),
            "bg": response[0].get("bg")
        }
    except:
        return "Error"

def enroll_course(user, course):
    try:
        print(user)
        print(course)
        response = db.enrolls.insert_one({
            "user": user,
            "course": course
        })
        print(response)
        return {
            "user": user,
            "course": course 
        }
    except:
        return "Error"

def get_enrolls(id):
    try:
        res = []
        response = db.enrolls.find({
            "user": id
        })
        for item in response:
            courses = db.courses.find({ "course_id": item.get("course") })
            for course in courses:
                res.append({
                    "course_id": course.get("course_id"),
                    "name": course.get("name"),
                    "description": course.get("description"),
                    "image": course.get("image"),
                    "bg": course.get("bg")
                })
        return res
    except:
        return "Error"

# Class for watson route
class WATSON_DB(Resource):
    def get(self):
        response = getWatson()
        return response
    def post(self):
        response = postWatson(request.json["message"], request.json["user"])
        return response

# Class for whatsApp route
class TWILIO(Resource):
    def post(self):
        response = twilioWhatsApp(request)
        return response

class COURSES(Resource):
    def post(self):
        response = create_course(request.json["name"], request.json["description"], request.json["image"], request.json["bg"])
        return response
    def get(self):
        response = get_courses()
        return response

class COURSE(Resource):
    def get(self):
        response = get_course(request.args.get('id'))
        return response

class ENROLLS(Resource):
    def post(self):
        response = enroll_course(request.json["user"], request.json["course"])
        return response
    def get(self):
        response = get_enrolls(request.args.get('id'))
        return response
    
# routes
api.add_resource(WATSON_DB, '/watson')  # Route_1
api.add_resource(TWILIO, '/whatsApp')  # Route_2
api.add_resource(COURSES, '/courses')  # Route_3
api.add_resource(COURSE, '/course')  # Route_3
api.add_resource(ENROLLS, '/enrolls')  # Route_4



if __name__ == '__main__':
    app.run(port='5002')
