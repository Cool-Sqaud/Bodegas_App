# Project for Bodegas Esmeralda

## Starting server
See Project_WIA for instructions on installing dependencies/serving the application 

## Updating the Backend
You only need to do `php artisan db:seed --class=BodegasSeeder` in the console to setup the database. </br>
Which will create the following 2 users:
| Role       | Email                        | Password |
|------------|------------------------------|----------|
| SuperAdmin | admin@catenazapata.com       | password |
| Admin      | g.izquierdo@catenazapata.com | password |
| User       | j.mushyan@catenazapata.com   | password |

# Updating the Environment Variables
You can just copy paste the old environments file (from Project_WIA) to the new file, and just change CLIENT to API (see environments.ts.example for reference)


# Result snipped:
{"id":2002,
"station":"836980",
"edited":null,
"date":"2023-04-03",
"time":"18:17:31",
"temp":17.5,
"dewp":14.5,
"stp":1016.6,
"slp":1018.1,
"visib":21.3,
"wdsp":4.6,
"prcp":0,
"sndp":0,
"frshtt":"000000",
"cldc":10.3,
"winddir":null,
"station_name":"836980",
"country_code":"BR",
"island":"",
"county":"",
"place":"",
"hamlet":"",
"town":"",
"municipality":"Regi\u00e3o Geogr\u00e1fica Imediata de Campos dos Goytacazes","state_district":"Regi\u00e3o Geogr\u00e1fica Intermedi\u00e1ria de Campos dos Goytacazes","administrative":"",
"state":"Rio de Janeiro","village":"","region":"Regi\u00e3o Sudeste","province":"",
"city":"Campos dos Goytacazes","locality":"","postcode":"28051-202","country":"Brazil","name":"836980",
"longitude":-41.333,"latitude":-21.75,
"elevation":11}