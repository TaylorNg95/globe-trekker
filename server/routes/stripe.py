from config import stripe, api
from flask_restful import Resource
from flask import redirect, request
import stripe

class StripeResource(Resource):
    def post(self):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': 'price_1PnQxZLUBQTMicjzFVP6wZ4C',
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url='http://localhost:5173/upgrade?success=true',
                cancel_url='http://localhost:5173/upgrade?canceled=true',
            )
            print(checkout_session.url)
        except Exception as e:
            return str(e)
        
        return redirect(checkout_session.url, code=303)
        
api.add_resource(StripeResource, '/api/create-checkout-session')