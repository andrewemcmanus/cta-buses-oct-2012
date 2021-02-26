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
# df[4] boardings
# df[5] alightings
def board_alight_js():
    board = list(df[4])
    alight = list(df[5])
    board_floats = []
    alight_floats = []
    board_alight = []
    for i in board:
        lat = float(i['latitude'])
        board_alight.append([lat, long])
    coordinates = np.array(latlong)
    return coordinates
result = latlong_js()
# print(result)
# result.to_csv('coordinates_modified.csv')
savetxt('coordinates.csv', result, delimiter=',')
