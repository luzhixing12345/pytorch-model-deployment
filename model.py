
import torch
import torch.nn as nn

class Generator(torch.nn.Module):
    def __init__(self, channels = 3, dimension = 1024, input_size = 100):
        super().__init__()
        # Input_dim = 100
        # Output_dim = C (number of channels)
        self.main_module = nn.Sequential(
            
            # input is Z which size is (batch size,Input_dim,1,1),going into a convolution
            # by default (32, 100, 1, 1)
            # project and reshape
            nn.ConvTranspose2d(in_channels=input_size, out_channels=dimension, kernel_size=4, stride=1, padding=0),
            nn.BatchNorm2d(num_features=dimension),
            nn.ReLU(True),

            # CONV1
            # State (32,1024,4,4)
            nn.ConvTranspose2d(in_channels=dimension, out_channels=dimension//2, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(num_features=dimension//2),
            nn.ReLU(True),

            # CONV2
            # State (32,512,8,8)
            nn.ConvTranspose2d(in_channels=dimension//2, out_channels=dimension//4, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(num_features=dimension//4),
            nn.ReLU(True),
            
            # CONV3
            # State (32,256,16,16)
            nn.ConvTranspose2d(in_channels=dimension//4, out_channels=dimension//8, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(num_features=dimension//8),
            nn.ReLU(True),
            
            # CONV4
            # State (32,128,32,32)
            nn.ConvTranspose2d(in_channels=dimension//8, out_channels=channels, kernel_size=4, stride=2, padding=1)
            )
            # State (32,3,64,64)

        # output activation function is Tanh
        self.output = nn.Tanh()

    def forward(self, x):
        x = self.main_module(x)
        return self.output(x)
    
def load_model():
    G = Generator()
    G.load_state_dict(torch.load('WGAN_G_ANIME256.pth',map_location=torch.device('cpu')))
    return G