for local
1. Enter the command to copy the docker image "docker pull webbylabhub/movies".
2. Enter the command to run image "docker run --name movies -p 8000:8000
   webbylabhub/movies".
To successfully run a frontend, go to the site where the running application
1. Enter the command to copy the docker image "docker pull proffessor7891/movies".
2. Enter the command to run image "docker run --name movies-frontend -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 proffessor7891/movies".