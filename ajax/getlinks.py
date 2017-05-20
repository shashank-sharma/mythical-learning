'''

Script to get links for some problems and answers

Requests - To get request from particular site
BeautifulSoup - To find meaningful data

(Alternative - urllib can also be used)

'''
import requests
import re
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
    final = l[1].text.split('\n')
    final.insert(0, MAIN_URL+result[0])
    return final

def codechefAnswers(url):
    '''
    Sample URL = https://www.codechef.com/problems/<PROBLEM>
    key = sort_by - Manage users
    sorting_order - Manage order
    language - 4 = python
    status=15 - ACCEPTED
    '''

    URL = 'https://www.codechef.com'
    print('\n\n\n')
    print(url)
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    url = url.replace('problems', 'status')
    setkey = '?sort_by=All&sorting_order=asc&language=4&status=15&Submit=GO'
    r = requests.get(url+setkey)
    soup = BeautifulSoup(r.content, "html.parser")

    l = soup.find_all('a', href = re.compile('^/viewsolution'))
    rno = randint(0, len(l))

    r = requests.get(URL + l[rno]['href'], headers = headers)
    soup = BeautifulSoup(r.content, "html.parser")
    x = soup.find_all('ol')
    z = x[0].find_all('li')
    aa = []
    for i in z:
        if i.text == '\xa0':
            aa.append('&nbsp')
        else:
            aa.append(i.text)
    #final = x[0].text.split('  ')
    aa.insert(0, URL + l[rno]['href'])
    return aa

