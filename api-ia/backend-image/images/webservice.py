import os
from os import path
import tensorflow as tf
import keras as keras
from PIL import Image
import numpy as np
from fastapi import FastAPI, File, UploadFile, Query, applications
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import StreamingResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder

app = FastAPI()

inception_net = tf.keras.applications.MobileNetV2()
import requests

response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")

assets_path = os.getcwd() + "/swagger-ui-assets"
if path.exists(assets_path + "/swagger-ui.css") and path.exists(assets_path + "/swagger-ui-bundle.js"):
    app.mount("/assets", StaticFiles(directory=assets_path), name="static")


    def swagger_monkey_patch(*args, **kwargs):
        return get_swagger_ui_html(
            *args,
            **kwargs,
            swagger_favicon_url="",
            swagger_css_url="/assets/swagger-ui.css",
            swagger_js_url="/assets/swagger-ui-bundle.js",
        )


    applications.get_swagger_ui_html = swagger_monkey_patch


@app.get("/", response_class=RedirectResponse, include_in_schema=False)
async def index():
    return "/docs"

@app.post("/imagens", tags=["Endpoints"])
async def trata_image(
    image_file: UploadFile = File(...)):
    image = Image.open(image_file.file)
    image = image.resize((224, 224))
    mimetype = image_file.content_type
    if mimetype == "image/png":
        image.load()
        background = Image.new("RGB", image.size, (255, 255, 255))
        try: 
            background.paste(image, mask=image.split()[3])
        except:
            aux = image.convert("RGBA")
            alpha = aux.split()[-1]
            background.paste(image, mask=alpha)            
        image = background
        print("Imagem png")
    elif mimetype == "image/jpeg":
#        image = image.convert("RGB")
        print("Imagem jpeg")
    else:
        return JSONResponse(
            content={"error": "Formato de imagem não suportado"}
        )
    
#    inp = np.array(image)
    inp = np.asarray(image, dtype=np.float32).reshape(-1,224,224,3)
#    inp = inp.reshape((-1, 224, 224, 3))
    inp = tf.keras.applications.mobilenet_v2.preprocess_input(inp)
    prediction = inception_net.predict(inp).flatten()
    confidences = {labels[i]: float(prediction[i]) for i in range(1000)}
    result = image_file.filename
    json_resposta = jsonable_encoder(confidences)

    return JSONResponse(
        content = json_resposta
    )

