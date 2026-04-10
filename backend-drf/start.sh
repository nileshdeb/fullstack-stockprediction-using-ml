#!/bin/sh
set -e

python manage.py collectstatic --no-input
python manage.py migrate

exec gunicorn stock_prediction_main.wsgi:application --bind 0.0.0.0:10000