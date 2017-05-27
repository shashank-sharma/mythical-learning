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
import json

def codechef():

    MAIN_URL = 'https://www.codechef.com'
    URL = 'https://www.codechef.com/problems/school'

    #r = requests.get(URL)
    #soup = BeautifulSoup(r.content, "html.parser")

    #links = soup.find_all('div', {'class': 'problemname'})
    #rno = randint(0, len(links))
    #result = [links[rno].find_all('a')[0]['href'], links[rno].text]

    #r = requests.get(MAIN_URL+result[0])

    with open('ccschool.json') as data_file:
        data = json.load(data_file)

    rno = randint(0, len(data))
    code = data[rno]['code']

    r = requests.get(MAIN_URL+'/problems/'+code)
    soup = BeautifulSoup(r.content, "html.parser")

    l = soup.find_all('div', {'class': 'content'})
    final = l[1].text.split('\n')
    final.insert(0, MAIN_URL+'/problems/'+code)
    return final

def codechefAnswers(url, language):
    '''
    Sample URL = https://www.codechef.com/problems/<PROBLEM>
    key = sort_by - Manage users
    sorting_order - Manage order
    language - 4 = python
    status=15 - ACCEPTED
    '''

    URL = 'https://www.codechef.com'
    TAGS = {' C': '11', ' C++14': '44', ' JAVA': '10', ' PYTH': '4'}
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    #url = url.replace('problems', 'status')
    #setkey = '?sort_by=All&sorting_order=asc&language=4&status=15&Submit=GO'

    code = url[34:]
    #r = requests.get(url+'/status/'+value)
    #soup = BeautifulSoup(r.content, "html.parser")

    #l = soup.find_all('a', href = re.compile('^/viewsolution'))
    with open('ccschool.json') as data_file:
        data = json.load(data_file)

    for i in data:
        if code == i['code']:
            ourData = i
            break
    
    rno = randint(0, len(ourData['answer'][TAGS[language]]))
    try:
        tag = ourData['answer'][TAGS[language]][rno]
    except:
        return 'no'

    r = requests.get(URL + '/viewsolution/' + tag, headers = headers)
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
    aa.insert(0, URL + '/viewsolution/' + tag)
    return aa

