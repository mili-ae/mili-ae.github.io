import json

iteration_index = 0
items = list()
new_json = dict()

with open("bannergen/src/data/titles.json", "r") as f:
    data = json.load(f)
    
    
for title in data:
    new_data = {
        "value": iteration_index,
        "label": title
    }
    
    items.append(new_data)
    iteration_index += 1
    
new_json["items"] = items

with open("titlesFixed.json", "w") as f:
    json.dump(new_json, f, indent=4)
    
print("Done")
    