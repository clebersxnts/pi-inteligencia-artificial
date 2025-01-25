FROM swaggerapi/swagger-ui:v5.9.1 AS swagger-ui
FROM python:3.10

WORKDIR /images

COPY . .
COPY --from=swagger-ui /usr/share/nginx/html/swagger-ui.css swagger-ui-assets/swagger-ui.css
COPY --from=swagger-ui /usr/share/nginx/html/swagger-ui-bundle.js swagger-ui-assets/swagger-ui-bundle.js

COPY ./requirements.txt /images/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /images/requirements.txt 

RUN python3 -m pip install tf-nightly
RUN python3 -m pip install keras

EXPOSE 9001

CMD gunicorn --bind 0.0.0.0:9001 --workers 1 --timeout 0 webservice:app -k uvicorn.workers.UvicornWorker
