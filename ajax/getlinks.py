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
from urllib.request import urlopen

def codechef():

    MAIN_URL = 'https://www.codechef.com'
    URL = 'https://www.codechef.com/problems/school'

    #r = requests.get(URL)
    #soup = BeautifulSoup(r.content, "html.parser")

    #links = soup.find_all('div', {'class': 'problemname'})
    #rno = randint(0, len(links))
    #result = [links[rno].find_all('a')[0]['href'], links[rno].text]

    #r = requests.get(MAIN_URL+result[0])

    with open('data/ccschool.json') as data_file:
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
    with open('data/ccschool.json') as data_file:
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
        ia = i.text
        ia = ia.replace("<", "&lt;")
        ia = ia.replace(">", "&gt;")
        if ia == '\xa0':
            aa.append(' ')
        else:
            aa.append(ia)
    #final = x[0].text.split('  ')
    aa.insert(0, URL + '/viewsolution/' + tag)
    return aa

'''
#######################################################################

Ynews functions

https://hacker-news.firebaseio.com/v0/ ...

Top stories  - topstories.json?print=pretty
New stories  - newstories.json
Best stories - beststories.json

Get story   - item/<id>.json


#######################################################################
'''

def getJson(link):
    response = urlopen(link).read().decode("utf-8")
    obj = json.loads(response)
    return obj

def ynews():
    data = getJson("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    count = 0
    stories = []
    for i in data:
        temp = []
        rno = randint(0, len(data))
        print('Working on ['+str(data[rno])+']')
        story = getJson("https://hacker-news.firebaseio.com/v0/item/"+str(data[rno])+'.json?print=pretty')
        try:
            temp.append(story['title'])
            temp.append(story['score'])
            temp.append(story['url'])
            temp.append(story['id'])
        except:
            continue
        print(temp)
        stories.append(temp)
        count+=1
        if count > 0:
            break
    return stories


'''
#######################################################################

Codeforces functions

http://codeforces.com/api/ ...

Problem sets    - problemset.problems
Sort with tags  - ?tags=implementation

SUBMISSIONS -----------------------------------------------------------

With random problem set:
  - http://codeforces.com/api/problemset.recentStatus?count=10

With particular problem id:
  - http://codeforces.com/api/contest.status?contestId=566&from=12000&count=10

UPDATE:

Problem set is moved to data/cfproblemset.json


#######################################################################
'''

def codeforces(method, quality):
    tags = ['implementation',
        'dp',
        'math',
        'greedy',
        'brute force',
        'data structures',
        'constructive algorithms',
        'dfs and similar',
        'sortings',
        'binary search',
        'graphs',
        'trees',
        'strings',
        'number theory',
        'geometry',
        'combinatorics',
        'two pointers',
        'dsu',
        'bitmasks',
        'probabilities',
        'shortest paths',
        'hashing',
        'divide and conquer',
        'games',
        'matrices',
        'flows',
        'string suffix structures',
        'expression parsing',
        'graph matchings',
        'ternary search',
        'meet-in-the-middle',
        'fft',
        '2-sat',
        'chinese remainder theorem',
        'schedules']

    # Some API calls will be made here
    # Update: Offline calls
    problemJSON = 'data/cfproblemset.json'

    with open(problemJSON) as data_file:
        data = json.load(data_file)

    flag = 0

    if method == 'random':
        ############### Getting random question #################
        while True:
            rno = randint(0, 821)
            if data['result']['problems'][rno]['index'] == quality:
                flag = 1
                break
            else:
                continue
    else:
        #rno = -int(method)
        for i in range(1, 821):
            if data['result']['problems'][-i]['contestId'] == int(method):
                if quality in data['result']['problems'][-i]['index']:
                    rno = -i
                    flag = 1
                    break
    if flag == 0:
        return 'no'
    question = data['result']['problems'][rno]
    code = question['index']
    contestId = question['contestId']
    url = 'http://codeforces.com/problemset/problem/'+str(contestId)+'/'+code

        ########################## END ##########################
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "html.parser")
    l = soup.find('div', {'class': 'problem-statement'})
    m = l.find_all('div')

    title = m[1].text # Slice text to get meaningful data
    memoryLimit = m[4].text
    content = []
    for i in m[10].find_all('p'):
        content.append(i)

    inputs = m[11].text
    outputs = m[13].text

    inputEx = m[15].find_all('pre')[0]
    outputEx = m[15].find_all('pre')[1]

    values = (title, url, question, content, inputs, outputs, inputEx, outputEx)
    return values

def codeforcesAnswer(url, code, version):
    data1 = []
    if version == 'fgpp':
        with open('data/'+version+'2.json') as data_file:
            data1 = json.load(data_file)
        version = 'fgpp1'

    with open('data/'+version+'.json') as data_file:
        data = json.load(data_file)

    data = data + data1
    url = url.split('/')
    contestId = int(url[5])
    index = url[6]

    for i in data:
        if i['contestId'] == contestId and i['index'] == index:
            finalData = i
            break
    ratings = ['Legendary grandmaster',
            'International Grandmaster',
            'Grandmaster',
            'International master',
            'Master',
            'Candidate Master',
            'Expert',
            'Specialist',
            'Pupil',
            'Newbie',
            'Unrated,',
            'Headquarters,']

    ratingscolors = ['black',
                    'red',
                    'red',
                    'orange',
                    'orange',
                    'purple',
                    'blue darken-4',
                    'teal',
                    'green',
                    'grey',
                    'white',
                    'white']

    if code == 'Expert':
        frating = ratings[:3]
    elif code == 'Hard':
        frating = ratings[3:6]
    elif code == 'Medium':
        frating = ratings[6:9]
    else:
        frating = ratings[9:]

    subbox = []
    for i in frating:
        if i in finalData['rating']:
            fkeys = list(finalData['rating'][i].keys())
            for j in fkeys:
                subm = finalData['rating'][i][j]
                subbox.append(subm)

    if subbox == []:
        return None, None, None, None, None
    srno = randint(0, len(subbox)-1)
    subm = subbox[srno]
    subUrl = 'http://codeforces.com/contest/'+str(contestId)+'/submission/'+str(subm)
    r = requests.get(subUrl)
    soup = BeautifulSoup(r.content, "html.parser")
    l = soup.find_all('pre', {'class': 'prettyprint'})
    m = soup.find_all('a', {'class': 'rated-user'})
    getrating = ' '.join(m[0]['title'].split()[:-1])
    print(getrating)
    print(ratings.index(getrating))
    getcolor = ratingscolors[ratings.index(getrating)]
    cfuser = m[0].text
    return l[0], subUrl, getrating, getcolor, cfuser
