#RUNNEAR SOLO SI SE QUIERE GUARDAR EL MODELO EN LOCAL
#Este script solo sirve para guardar el modelo preentrenado en local.

from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification

#A completar con el directorio donde se quiera guardar el modelo
path = "./MODEL"

#Modelo que he escogido se puede llegar a cambiar en un futuro muy facilmente
MODEL = f"tabularisai/multilingual-sentiment-analysis"

#Declaracion del tokenizador y modelo para guardarlos en local
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)
tokenizer.save_pretrained(path)
model.save_pretrained(path)
