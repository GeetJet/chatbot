import nltk
import openai
from urllib.request import urlopen
import pyttsx3
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random
import speech_recognition as sr
import os
import matplotlib
import fitz
import streamlit as st
import pygame
import subprocess
from PyPDF2 import PdfFileReader
import webbrowser
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

matplotlib.use('Agg')
from matplotlib import pyplot
openai.api_key = "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"

def Empathy(query):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[

            {"role": "user", "content": """ Hey ! Here are some rules
                1) I want you to be empathetic to the users response
                2) Never mention you are an AI model, Now you are an experienced therapist with over 30 years of experience.
                3) You are a loving friend and will always provide empathetic responses 
                4) Always end your response with a question to keep the conversation going! """ + query}

        ]
    )

    summary = completion.choices[0].message.content
    return summary

def qna_response(user_request):
    GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey", "how are you")
    GREETING_RESPONSES = ["hi", "hey", "hey, what document would you like to view ?", "hi there", "hello"]

    def greeting(sentence):
        for word in sentence.split():
            if word.lower() in GREETING_INPUTS:
                return random.choice(GREETING_RESPONSES)

    QUERY_INPUTS = ("what", "yourself", "tell", "do", "whats", "what's")
    QUERY_RESPONSES = ["hi, I am SWI bot . I can get SWI documents for you. Which document would you like to view?"]

    def query(sentence):
        for word in sentence.split():
            if word.lower() in QUERY_INPUTS:
                return random.choice(QUERY_RESPONSES)


    directory = r'C:\Users\Gjeethwani\PycharmProjects\pythonProject\chatbot'
    #directory = '/app/pdf'

    bot_response = ''
    instnce = 0

    if('trouble' in user_request):
        bot_response = Empathy(user_request)

    if (greeting(user_request) == None and query(user_request) == None and 'trouble' not in user_request):

        # stop words
        sw_list = ['open', 'Open', 'save', 'document', 'please', 'show', '?', 'could', 'about', 'search']
        all_stopwords = stopwords.words('english')
        all_stopwords.extend(sw_list)

        text_tokens = word_tokenize(user_request)
        tokens_without_sw = [word for word in text_tokens if not word in all_stopwords]
        filtered_sentence = (" ").join(tokens_without_sw)


        # lemmatizer

        lemmatizer = WordNetLemmatizer()

        user_request = filtered_sentence
        # user_request = lemmatizer.lemmatize(user_request)

        word_list = nltk.word_tokenize(user_request)
        lemmatized_output = ' '.join([lemmatizer.lemmatize(w) for w in word_list])
        user_request = lemmatized_output

        user_count = len(user_request.split())

        for filename in os.listdir(directory):
            if filename.endswith(".pdf"):
                fpath = os.path.join(directory, filename)
                doc = fitz.open(fpath)
                count = 0
                pdf = PdfFileReader(open(fpath, 'rb'))
                pno = pdf.getNumPages()
                print(filename, pno)
                pno = pno - 1

                # Change 1 to pno to look instances in more pages
                for i in range(1):

                    # if(j==0):
                    page = doc[i]
                    # print("Processing page: " + str(i))
                    j = i
                    ### SEARCH
                    text = user_request
                    text_instances = page.searchFor(text)
                    ###split
                    x = user_request.split()

                    for j in range(len(x)):
                        user_search_text = page.searchFor(x[j])
                        text_instances = user_search_text

                        ### HIGHLIGHT

                        for inst in text_instances:
                            highlight = page.addHighlightAnnot(inst)
                            #out = "output" + str(i + 1)
                            out = filename
                            instnce = 1

                        if instnce == 1:
                            print("instance found")
                            count = count + 1
                            #print(count)
                            instnce = 0

                    if (user_count == count and user_count != 0):
                        os.chdir(r'C:\Users\Gjeethwani\PycharmProjects\pythonProject\chatbot\static\pdf')
                        #os.chdir('/app/static/pdf')

                        dir = r'C:\Users\Gjeethwani\PycharmProjects\pythonProject\chatbot\static\pdf'
                        #dir = '/app/static/pdf'
                        try:
                            for file in os.scandir(dir):
                                    os.remove(file.path)
                        except:
                            print('no file')

                        doc.save(out, garbage=4, deflate=True, clean=True)
                        os.chdir(r'C:\Users\Gjeethwani\PycharmProjects\pythonProject\chatbot')
                        #os.chdir('/app')
                        return "document found"
                    instnce = 0
            else:
                continue

        bot_response = "Sorry , please try again . Try telling a document name like cover or final assembly"
    elif (greeting(user_request) != None):
        bot_response = greeting(user_request)
    elif (query(user_request) != None):
        bot_response = query(user_request)
    # else:
    #     bot_response = response(user_request)

    return bot_response
