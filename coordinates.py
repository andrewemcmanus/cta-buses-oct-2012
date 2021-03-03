import ast
import numpy as np
from openpyxl import load_workbook
import pandas as pd
from numpy import savetxt

workbook = load_workbook(filename="cta-ridership-avg.-weekday-bus-stop-boardings-in-october-2012.xlsx")
sheet = workbook.active
values = sheet.values

# print(df)
cols = next(values)
values = list(values)

# LOCATION = 8
df = pd.DataFrame(values)
# location column:

# stop Id column:
# print(df[0])
# ast.literal_eval(df[8])
def latlong_js():
    location_list = list(df[8])
    locations = []
    latlong = []
    for i in location_list:
        if i == location_list[0]:
            print(i)
        else:
            dict = ast.literal_eval(i)
            locations.append(dict)
    for i in locations:
        lat = float(i['latitude'])
        long = float(i['longitude'])
        latlong.append([lat, long])
    coordinates = np.array(latlong)
    return coordinates
result = latlong_js()
print(result)
# result.to_csv('coordinates_modified.csv')
# better way than savetxt?
# savetxt('coordinates.csv', result, delimiter=',')
