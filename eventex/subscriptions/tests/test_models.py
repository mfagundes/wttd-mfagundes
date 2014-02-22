# coding: utf-8
from django.test import TestCase
from django.db import IntegrityError
from eventex.subscriptions.models import Subscription
from datetime import datetime

class SubscriptionTest(TestCase):
    def setUp(self):
        self.obj = Subscription(
            name='Mauricio Fagundes',
            cpf='12345678909',
            email='mauricio.fagundes@gmail.com',
            phone='21 99811 9570',
        )

    def test_create(self):
        'Subscription must have name, cpf, email, phone'
        self.obj.save()
        self.assertEqual(1, self.obj.pk)

    def test_has_created_at(self):
        'Subscription must have automatic created_at'
        self.obj.save()
        self.assertIsInstance(self.obj.created_at, datetime)

    def test_unicode(self):
        self.assertEqual(u'Mauricio Fagundes', unicode(self.obj))

    def test_paid_default_value_is_False(self):
        'By default paid must be False'
        self.assertEqual(False, self.obj.paid)

class SubscriptionUniqueTest(TestCase):
    def setUp(self):
        # Create a first entry to force the collision
        Subscription.objects.create(
            name='Maurício Fagundes',
            cpf = '12345678909',
            email = 'mauricio.fagundes@gmail.com',
            phone = '21 99811 9570',
        )

    def test_cpf_unique(self):
        'CPF must be unique'
        s = Subscription(name='Maurício Fagundes', cpf='12345678909',email='mauricio@fagundes.info')
        self.assertRaises(IntegrityError, s.save)

    def test_email_unique(self):
        'Email must be unique'
        s = Subscription(name='Maurício Fagundes', cpf='00000000011', email='mauricio.fagundes@gmail.com')
        self.assertRaises(IntegrityError, s.save)

