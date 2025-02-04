# Use uma imagem base com suporte a Python
FROM python:3.10-slim

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo requirements.txt para o contêiner

# Instale as dependências listadas no requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copie o arquivo webservice.py para o contêiner


# Copie o diretório 'images' para o contêiner


# Exponha a porta que o serviço irá utilizar
EXPOSE 9001

# Comando para iniciar o serviço
CMD ["python3", "/app/webservice.py"]

FROM nvidia/cuda:11.7.1-cudnn8-runtime-ubuntu20.04

# Instalar dependências básicas
RUN apt-get update && apt-get install -y python3 python3-pip git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY . /app

# Instalar dependências do Python
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt

# Expor a porta da API
EXPOSE 9001

# Comando para rodar a aplicação
CMD ["python3", "webservice.py"]
