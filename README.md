# Mythical Learning

<img src = 'http://i.imgur.com/RTHUQNV.png' align="right" height="50%" width="50%"></img>
![Heroku](https://heroku-badge.herokuapp.com/?app=mythical-learning&root=admin&style=flat)
![Travis](https://travis-ci.org/shashank-sharma/mythical-learning.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/shashank-sharma/mythical-learning/badge.svg?branch=master)](https://coveralls.io/github/shashank-sharma/mythical-learning?branch=master)

## Django based web app to enhance learning feature of Competitive Programming.

Real site: [Heroku final site](http://mythical-learning.herokuapp.com/)

### What is Mythical Learning ?

Mythical learning encourages developers to read source code and blogs related to their choice.
It is an web app made with the help of Python and Django.

It fetch data from mainly 3 websites:

1. Hackernews
2. Codechef
3. Codeforces

Based on different sources mythical learning web app have 3 main sections which are inside one main menu Temple:

1. Problems

Problems page fetch random problems from codechef and provide answers in just one click. Answers support 4 main languages which are C++, C, Python, Java.

Main features which are added is that the answers are in collapsable form so it has better UI also if the solution is good then you can add them to view it later.

2. Blog

Blog feature lets you grab random blog from Hackernews and view them on the same site rather than opening any new window. This also include saving those blog for later use.

3. Codeforces course C++

This is deigned to let user to learn the concept of C++ by following some legendary users solution. This helps you to go to each solution is sequential order and then view some top rated solution which helps you to get some good habits.

### Features

Since this is a web app so it provides few functions which performs few task.

1. Authentication - In this web app Django based Authentication feature is used which is built in. Authentication process includes filling Sign up form and then activating your account from the given link which will be mailed to your email id. After this process you can easily log in.

2. Dynamic - Many AJAX calls were used to ease your experience while learning from this site.

## Technologies Used

1. Django 1.10
2. Materialize css
3. Scrapy
4. ScrapingHub

## Other helpful repositories used

Data was fetched by creating spider and link for that repositories are:

https://github.com/shashank-sharma/codeforces-scraper

https://github.com/shashank-sharma/codechef-scrapper

