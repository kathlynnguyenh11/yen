import requests
import os
from dotenv import load_dotenv, find_dotenv
from urllib.parse import urlparse

load_dotenv(find_dotenv()) # This is to load your API keys from .env

AUTH_URL = 'https://accounts.spotify.com/api/token'
BASE_URL = 'https://api.spotify.com/v1/artists'
SEARCH_URL = 'https://api.spotify.com/v1/search'

def get_auth_headers():
    # POST
    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': os.getenv('SPOTIFY_CLIENT_ID'),
        'client_secret': os.getenv('SPOTIFY_CLIENT_SECRET'),
    })

    # convert the response to JSON
    auth_response_data = auth_response.json()

    # save the access token
    access_token = auth_response_data['access_token']

    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }
    
    return headers

def get_artist_data(artist_id):
    url = '/'.join((BASE_URL, artist_id))
    
    response = requests.get(url, headers=get_auth_headers())
    data = response.json()
        
    return data
    
def get_artist_top_tracks(artist_id):
    top_tracks_url = '/'.join((BASE_URL, artist_id,'top-tracks'))
    params = {
        'country': 'US'
    }
    response = requests.get(top_tracks_url, params=params, headers=get_auth_headers()) 
    top_tracks = response.json()
    
    return top_tracks
    
def get_artist_by_name(name):
    params = {
        'q': name,
        'type': 'artist'
    }
    response = requests.get(SEARCH_URL, params=params, headers=get_auth_headers()) 
    data = response.json()
    
    return data