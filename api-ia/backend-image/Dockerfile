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
