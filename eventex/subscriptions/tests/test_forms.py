# coding: utf-8

from django.test import TestCase

from eventex.subscriptions.forms import SubscriptionForm

class SubscriptionFormTeste(TestCase):
    def test_form_has_fields(self):
        'Form must have 4 fields'
        form = SubscriptionForm()
        self.assertItemsEqual(['name', 'email', 'cpf', 'phone'], form.fields)

    def test_cpf_is_digit(self):
        'CPF must only accept digits'
        form = self.make_validated_form(cpf='ABCD5678901')
        self.assertItemsEqual(['cpf'], form.errors)

    def test_cpf_has_11_digits(self):
        'CPF must have 11 digits'
        form = self.make_validated_form(cpf='1234')
        self.assertItemsEqual(['cpf'], form.errors)

    def test_email_is_optional(self):
        'Email is optional'
        form = self.make_validated_form(email='')
        self.assertFalse(form.errors)

    def test_must_inform_email_or_telephone(self):
        'Email and telefone are optional, but one must be informed'
        form = self.make_validated_form(email='', phone_0='', phone_1='')
        self.assertItemsEqual(['__all__'], form.errors)

    def test_name_must_be_capitalized(self):
        'Name must be capitalized'
        form = self.make_validated_form(name=u'MAURÍCIO fagundes')
        self.assertEqual(u'Maurício Fagundes', form.cleaned_data['name'])

    def make_validated_form(self, **kwargs):
        data = dict(name=u'Maurício Fagundes', email='mauricio@fagundes.info', cpf='12345678901', phone_0='21', phone_1='22222222')
        data.update(kwargs)
        form = SubscriptionForm(data)
        form.is_valid()
        return form

