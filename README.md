# Project for Bodegas Esmeralda

## Starting server
See Project_WIA for instructions on installing dependencies/serving the application 

## Updating the Backend
You only need to do `php artisan db:seed --class=BodegasSeeder` in the console to setup the database. </br>
Which will create the following 2 users:
| Role  | Email                        | Password |
|-------|------------------------------|----------|
| Admin | admin@catenazapata.com       | password |
| User  | g.izquierdo@catenazapata.com | password |

# Updating the Environment Variables
You can just copy paste the old environments file (from Project_WIA) to the new file, and just change CLIENT to API (see environments.ts.example for reference)