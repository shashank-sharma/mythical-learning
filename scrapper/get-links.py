'''

Script to get links for some problems and answers

Requests - To get request from particular site
BeautifulSoup - To find meaningful data

(Alternative - urllib can also be used)

'''
import requests
from bs4 import BeautifulSoup

def codechef():

    URL = 'https://www.codechef.com/problems/school'

    r = requests.get(URL)
    soup = BeautifulSoup(r.content, "html.parser")

    links = soup.find_all('div', {'class': 'class': 'problemname'})

