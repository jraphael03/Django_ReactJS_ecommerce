from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'

    # Needed for signals.py, and 'base.apps.BaseConfig' is needed in settings INSTALLED_APPS
    def ready(self):
        import base.signals     # base is the app folder, then file signals
