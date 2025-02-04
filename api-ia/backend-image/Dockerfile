# Use uma imagem base com suporte a Python
FROM python:3.10-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo requirements.txt e instale as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante dos arquivos (incluindo o webservice.py)
COPY . .

# Exponha a porta que o serviço irá rodar
EXPOSE 9001

# Comando para iniciar o serviço
CMD ["python3", "webservice.py"]
