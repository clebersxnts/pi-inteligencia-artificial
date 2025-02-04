# Use uma imagem base com suporte a Python
FROM python:3.10-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários
COPY backend-image/images/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend-image/images/webservice.py /app/webservice.py
COPY backend-image/images /app/images

# Exponha a porta que o serviço irá rodar
EXPOSE 9001

# Comando para iniciar o serviço
CMD ["python3", "/app/webservice.py"]
