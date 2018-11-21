# Cron Job Expressions

6 fields
Minutes,	Hours,	Day of month,	Month,	Day of week,	Year

UTC
35 minutes, 2 AM, 1st of the month, April, Monday to Friday, 2012 

cron(35, 2, 1, 4, MON-FRI, 2012)



cron(0 10 * * ? *)
Run at 10:00 am (UTC) every day


cron(0/5 8-17 ? * MON-FRI *)
Run every 5 minutes Monday through Friday between 8:00 am and 5:55 pm (UTC)


