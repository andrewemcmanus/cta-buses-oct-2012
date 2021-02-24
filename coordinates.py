import ast
# import numpy as np
from openpyxl import load_workbook
import pandas as pd

workbook = load_workbook(filename="cta-ridership-avg.-weekday-bus-stop-boardings-in-october-2012.xlsx")
sheet = workbook.active
values = sheet.values
values = list(values)
# LOCATION = 8
df = pd.DataFrame(values)
# location column:
location_list = list(df[8])

locations = []
for i in location_list:
    if i == location_list[0]:
        print(i)
    else:
        dict = ast.literal_eval(i)
        locations.append(dict)
# print(locations)
coordinates = []
for i in locations:
    lat = float(i['latitude'])
    long = float(i['longitude'])
    coordinates.append([lat, long])
    # long = float(i['latitude'])
print(coordinates)
