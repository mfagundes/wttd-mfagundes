# coding: utf-8

from django.shortcuts import render_to_response, render
from django.template import RequestContext
from django.conf import settings

def home(request):
    return render(request, 'core/index.html')


