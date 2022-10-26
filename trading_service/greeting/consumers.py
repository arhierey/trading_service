from channels.generic.websocket import WebsocketConsumer
import json
from random import random
from time import sleep


def generate_movement():
    movement = -1 if random() < 0.5 else 1
    return movement


class WSConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        options_price = [0] * 101

        for i in range(100):
            options_price[0] = i
            for j in range(100):
                options_price[j+1] += generate_movement()
            print(options_price)
            self.send(json.dumps({'message': options_price}))
            sleep(1)

