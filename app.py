

from flask import redirect, render_template,request,url_for
from flask import Flask
import torch
from torchvision import utils
from model import load_model
import json
import re

app = Flask(__name__)
app.secret_key = 'fkdjsafjdkfdlkjfadskjfadskljdsfklj'

G = load_model()

single_number = 0
multiply_number = 0

@app.route('/')
def index():
    return render_template('index1.html',image_url="./static/fake_images.png",data=0,load = 'false')

# @app.route('/uploads/<path:filename>')
# def download_file(filename):
#     return send_from_directory(os.path.join('static','images'),
#                                filename, as_attachment=True)


@app.route('/changePageTo', methods=['GET','POST'])
def navigateToGenerator():
    
    image_url = "./static/images/multiply.png"
    return render_template('index2.html', image_url=image_url)


@app.route('/changePageBack', methods=['GET','POST'])
def navigateBackGenerator():
    
    return redirect(url_for('index'))



@app.route('/generate', methods=['GET','POST'])
def generate():
    if request.method == 'POST':
        result = json.dumps(request.form)
        # print(result)
        data = json.loads(result)['jsonval']
        if data == '':
            # from index2.html
            z = torch.randn(64,100,1,1)
            fake_images = G(z)
            fake_images = fake_images.mul(0.5).add(0.5).cpu()
            
            image_grid = utils.make_grid(fake_images, nrow=8)
            global multiply_number
            image_url = f'./static/images/{multiply_number}.png'
            multiply_number += 1
            if multiply_number > 10:
                multiply_number = 0
            utils.save_image(image_grid, image_url)
            print('Saved fake images')
            
            return render_template('index2.html', image_url=image_url)
        else:
            # from index1.html
            data = re.findall(r"\d+\.?\d*",data)
            z = [(float(i)/255-0.5)/0.5 for i in data]
            
            # z = torch.randn(64,100,1,1)
            # print(torch.max(z),torch.min(z))
            z = torch.tensor(z).unsqueeze(0).unsqueeze(2).unsqueeze(3)
            z = [z for _ in range(64)]
            z = torch.cat(z)
            # print(z.shape)
            fake_images = G(z)
            fake_images = fake_images.mul(0.5).add(0.5).cpu()
            
            image_grid = utils.make_grid(fake_images[0], nrow=1)
            global single_number
            image_url = f'./static/images/{single_number}.png'
            single_number += 1
            if single_number > 10:
                single_number = 0
            utils.save_image(image_grid, image_url)
            print('Saved fake images')
            
            return render_template('index1.html', image_url=image_url,data=data,load='true')
    
if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=3000)#, threaded = False, processes=50)