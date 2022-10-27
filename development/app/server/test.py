import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "x", {"age": 10, "gender" : "male"})
print("PUT Response: ")
print( response.json())
input()
response = requests.get(BASE+"y")
print("GET Response: ")
print( response.json())
