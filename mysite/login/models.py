from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Profile model used for dashboard and settings
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    email_confirmed = models.BooleanField(default=False)

# To save Answers from problems
class Answers(models.Model):
    user = models.ForeignKey(User)
    question = models.TextField(max_length=100, blank = True)
    lang = models.TextField(max_length = 20, blank = True)
    answer = models.TextField(max_length = 100, blank = True)
    track = models.TextField(max_length = 20, blank = True)

    def __str__(self):
        return self.answer

# Keep track of language which user prefer for answers
class Language(models.Model):
    user = models.ForeignKey(User)
    lang = models.TextField(max_length=20, blank = True)

@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
