import os
from datetime import timedelta
from pathlib import Path
import psycopg2

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'dx*zpgl&ay!l5w1)hl6mays-1o1id-==xu2#*63(lef-p(s*sa'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',       # installed
    'corsheaders',          # installed
    'storages',

    'base.apps.BaseConfig',

]


# FOR JSON WEBTOKEN
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# settings for JSON webtoken
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),      # Token lifetime, can be minutes, hours, days, weeks etc..
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),        # Refresh token lifetime
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    #'SIGNING_KEY': settings.SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',     # added for corsheaders   


    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend/build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

#   Connecting directly to postgresql
# DATABASES = {
#     'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
       # 'NAME': BASE_DIR / 'db.sqlite3',
        # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
        # 'NAME': 'electroshop',
        # 'USER': 'postgres',
        # 'PASSWORD': 'Opendoors744784',
        # 'HOST': 'localhost',
        # 'PORT': '5432',
#     }
# }

# Connect to AWS
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'electroshop',
        'USER': 'justinraphael',
        'PASSWORD': 'Opendoors744784',
        'HOST': 'electroshop-identifier.cauw3xeboyri.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/images/'      # Where to render images at

STATICFILES_DIRS = [        # Created so django knows about our static folder
    BASE_DIR / 'static',     # communicate with BASE_DIR / 'static'     folder,
    BASE_DIR / 'frontend/build/static'      # Look for static files in the frontend
]

MEDIA_ROOT = 'static/images' # Any file that is uploaded from a Model, upload it here   static folder images folder

# Cors header will allow any request only safe while developing
CORS_ALLOW_ALL_ORIGINS = True

AWS_QUERYSTRING_AUTH = False
# Connect to aws s3
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# USER ACCESS KEYS FOR THE BUCKET
AWS_ACCESS_KEY_ID = 'AKIAWOLMCLZ4SGEZG2US'
AWS_SECRET_ACCESS_KEY  = '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'
# BUCKET NAME
AWS_STORAGE_BUCKET_NAME = 'electroshop'