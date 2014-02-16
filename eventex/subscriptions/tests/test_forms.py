from django.test import TestCase

from eventex.subscriptions.forms import SubscriptionForm

class SubscriptionFormTeste(TestCase):
    def test_form_has_fields(self):
        'Form must have 4 fields'
        form = SubscriptionForm()
        self.assertItemsEqual(['name', 'email', 'cpf', 'phone'], form.fields)
