from flask import Flask, request, jsonify
import torch
from diffusers import StableDiffusionPipeline
from pathlib import Path

app = Flask(__name__)

# Configuração do pipeline do Stable Diffusion
pipeline = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16)
pipeline = pipeline.to("cuda")  # Configuração para GPU

# Diretório para salvar imagens geradas
output_dir = Path("/app/images/generated")
output_dir.mkdir(parents=True, exist_ok=True)

@app.route("/generate-image", methods=["POST"])
def generate_image():
    data = request.get_json()
    prompt = data.get("prompt", "A beautiful sunset")
    
    # Gerar a imagem
    image = pipeline(prompt).images[0]
    output_path = output_dir / "output.png"
    image.save(output_path)
    
    return jsonify({"message": "Image generated successfully!", "path": str(output_path)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9001)
