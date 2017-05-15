'''

Script to get links for some problems and answers

Requests - To get request from particular site
BeautifulSoup - To find meaningful data

(Alternative - urllib can also be used)

'''
import requests
from bs4 import BeautifulSoup
from random import randint

def codechef():

    MAIN_URL = 'https://www.codechef.com'
    URL = 'https://www.codechef.com/problems/school'

    r = requests.get(URL)
    soup = BeautifulSoup(r.content, "html.parser")

    links = soup.find_all('div', {'class': 'problemname'})
    rno = randint(0, len(links))
    result = [links[rno].find_all('a')[0]['href'], links[rno].text]

    r = requests.get(MAIN_URL+result[0])
    soup = BeautifulSoup(r.content, "html.parser")

    l = soup.find_all('div', {'class': 'content'})
    return l[1].text.split('\n')
