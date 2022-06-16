
from flask import render_template,request
from flask import Flask
import torch
from torchvision import transforms,utils
from model import load_model
import os

app = Flask(__name__)
G = load_model()
@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/generate', methods=['GET', 'POST'])
def generate():
    if request.method == 'POST':
        z = torch.randn(64,100,1,1)
        
        fake_images = G(z)
        fake_images = fake_images.mul(0.5).add(0.5).cpu()
        # save the fake_images
        # toPIL = transforms.ToPILImage()
        # image = toPIL(fake_images[0])
        # image.save(os.path.join('static','fake_images.png'))
        
        image_grid = utils.make_grid(fake_images, nrow=8)
        utils.save_image(image_grid, './static/fake_images.png')
        print('Saved fake images')
        
    return render_template('index.html', image_url="fake_images.png")
    
if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=9000)