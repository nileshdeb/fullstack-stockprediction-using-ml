FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --no-input
RUN python manage.py migrate

EXPOSE 10000

CMD ["gunicorn", "stock_prediction_main.wsgi:application", "--bind", "0.0.0.0:10000"]