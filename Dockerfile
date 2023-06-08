FROM python:3.8

COPY . /app
WORKDIR /app

EXPOSE 5000

RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["app.py"]