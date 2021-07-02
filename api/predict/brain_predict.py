import sys
import tensorflow
from tensorflow import keras
from keras.models import model_from_json
import numpy as np

import sklearn
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv1D, AveragePooling1D, Flatten, Reshape, LSTM
from keras.losses import MeanAbsoluteError

# Ler os dados que são passados como parâmetro
rawData = str(sys.argv[1])

# Transformar a string em uma matriz
raw_data = raw_data.split(';')
data_rows = []
for row in raw_data:
    data_rows.append(row.split(','))
raw_data = data_rows

# Definir as colunas de entrada que são úteis
useful_headers = ['H.A','L.A','H.B','L.B','M.G','L.G','THE','DEL']
# Definir o número de leituras que o modelo utiliza para fazer a predição
readings_number = 250

# Verificar se as colunas necessárias estão presentes entre cabeçalhos
data_headers = raw_data[0]
raw_data = raw_data[1:]
def verify_headers(useful_headers, data_headers):
    for header in useful_headers:
        if header not in data_headers: return False
    return True
if not verify_headers(useful_headers, data_headers):
    print('{"error":"The sent data does not have all the necessary headers with signals names"}')
    exit()
    
# Verificar se os dados tem leituras o suficiente dos sinais
if len(raw_data) < readings_number + 1:
    print('{"error":"The sent data does not have enough observations, it must have at least %i observations for each signal"}' %readings_number)
    exit()

# Padronizar para os dados tenham o shape para o qual o modelo foi treinado, que é (1,250,16)
# (1 amostra, 250 medições, 16 canais (8 de entrada e 8 calculados))
# Selecionar apenas as linhas necessárias
if len(raw_data) > readings_number:
    raw_data = raw_data[int(len(raw_data)/4):int(len(raw_data)/4)+readings_number]
# Selecionar apenas as colunas necessárias
data = []
for row in raw_data:
    data_row = []
    for header in useful_headers:
        data_row += [row[data_headers.index(header)]]
    data += [data_row]
    
# Para enriquecer a base e disponibilizar mais informações para a modelagem, vamos adicionar colunas que informem as variações dos sinais em relação ao tempo, comparando o registro atual com o anterior
rich_data = []
for row in range(len(data)):
    row_data = []
    for col in range(len(useful_headers)):
        row_data += [data[row][col]]
    for col in range(len(useful_headers)):
        if row == 0:
            row_data += [0]
        else:
            row_data += [int(data[row][col])-int(data[row-1][col])]
    rich_data += [row_data]

# Convertendo os dados enriquecidos para o formato np.array
data = np.array([rich_data], dtype=np.int32)

# Carregar a arquitetura do modelo classificador
json_classifier = open('brain_classifier.json', 'r')
brain_classifier = model_from_json(json_classifier.read())
json_classifier.close()
# Carregar os pesos do modelo classificador
brain_classifier.load_weights("brain_classifier.h5")

# Carregar a arquitetura do modelo regressor
json_regressor = open('brain_regressor.json', 'r')
brain_regressor = model_from_json(json_regressor.read())
json_regressor.close()
# Carregar os pesos do modelo regressor
brain_regressor.load_weights("brain_regressor.h5")

# Realizar as predições e retornar os valores
classifier_prediction = brain_classifier.predict(data)[0][0][0]
regressor_prediction = brain_regressor.predict(data)[0][0]
print('{"classifier":%.2f,"regressor":%.2f}' %(classifier_prediction, regressor_prediction))
exit()
