# Make sure you let app.py know about this app
from django.db.models.signals import pre_save       # Anything in pre-save is going to listen to a model to save and it will allow us to fire off an action beforre the model finishes the save process
from django.contrib.auth.models import User              # Want to fire off anytime our user model is created or updated

def updateUser(sender, instance, **kwargs):
    #print('Signal Triggered')
    user = instance
    if user.email != '':            # if user.email is not empty take it and update the username to email
        user.username = user.email

pre_save.connect(updateUser, sender=User)   # anytime the User model is saved, pre_save fire off the function provided (updateUser)

