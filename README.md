# badminton_game_CRUD

# set up
1.  `docker-compose up`
2.  `npm install`
3.  `npm run db:migrate`
* if error encountered regarding the user privileges
  1.  `docker ps`
  2.  `docker exec -it <container id> /bin/bash`
  3.  `mysql -u root -p`
  4.  `password123`
  5.  `GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.<your ip>.0.1’ IDENTIFIED BY 'password' WITH GRANT OPTION;`
  6.  `SET PASSWORD FOR 'root'@'172.<your ip>.0.1’ = PASSWORD('password123');`
  7.  `FLUSH PRIVILEGES;`

4. `npm run start` or `npm run start:dev`


# Endpoints
1. GET: `/api/getAll`
  * no params
  
2.  POST `/api/match`
  *  request body `{ set: 1 }`
  
3.  PATCH `/api/match/:id`
  *  request body `{ team: team_one }` ( team_one or team_two only )
  
4.  DELETE `/api/match/:id`
