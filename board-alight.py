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
def board_js():
    board = list(df[4])
    board_floats = []
    for i in board:
        if i == board[0]:
            print(i)
        else:
            bd = float(i)
            board_floats.append(bd)
    boardings = np.array(board_floats)
    print(boardings)
    return boardings
def alight_js():
    alight = list(df[5])
    alight_floats = []
    for i in alight:
        if i == alight[0]:
            print(i)
        else:
            fl = float(i)
            alight_floats.append(fl)
    alightings = np.array(alight_floats)
    print(alightings)
    return alightings
result_board = board_js()
# result_alight = alight_js()
# print(result)
# result.to_csv('board_alight_modified.csv')
# savetxt('boardings.csv', result_board, delimiter=',')
# savetxt('alightings.csv', result_alight, delimiter=',')
