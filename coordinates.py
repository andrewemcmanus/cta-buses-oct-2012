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
# print(df[0])
# location column:

# RECONSTRUCT USING pd.DataFrame?

# stop Id column:
# print(df[0])
# stop_ids = ast.literal_eval(df[0])
# print(df[0])
def latlong_js():
    location_list = list(df[8])
    # print(location_list)
    locations = []
    latlong = []
    for i in location_list:
        if i == location_list[0]:
            print(i)
        else:
            dict = ast.literal_eval(i)
            locations.append(dict)
    # print(locations)
    # do I even need to convert to floats here??
    # save as basic JSON?? No need to use CSV at all?
    for i in locations:
        lat = float(i['latitude'])
        long = float(i['longitude'])
        latlong.append([lat, long])
    coordinates = np.array(latlong)
    # print(coordinates)
    return coordinates
result = latlong_js()
print(result)
result.to_csv('coordinates_modified.csv', header=None, index=None)
# better way than savetxt?
# savetxt('coordinates_modified.csv', result, delimiter=',')
