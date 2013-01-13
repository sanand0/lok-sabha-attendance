"""
Converts the scraped results into a usable pivot-table
"""
import pandas as pd
import numpy as np

data = pd.read_csv('attendance.csv')
data['Date'] = data['Date'].apply(lambda v: pd.datetime.strptime(v, '%m/%d/%Y').strftime('%Y-%m-%d'))
data['Attendance'] = data['Attendance'].replace({'S': 1, 'NS': np.nan}).astype(float)
data['Name'] = data['Name'].str.replace(r' +', ' ')
table = data.pivot_table(rows='Name', cols='Date', values='Attendance')
table.to_csv('attendance-lok-sabha.csv', float_format='%.0f')
