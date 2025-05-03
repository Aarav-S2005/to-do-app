const express = require('express');

const app = express();


app.listen(process.env.PORT, () =>{
    console.log(`Server listening on port: ${process.env.PORT}... ` );
} )

/*

Routes :-

lists :-
GET     /lists                         done
POST    /lists                         done
GET     /lists/:listId                 done
PUT     /lists/:listId                 done
DELETE  /lists/:listId                 done

todos :-
GET     /lists/:listId/todos           done
POST    /lists/:listId/todos           done
PUT     /lists/:listId/todos/:todoId   done
DELETE  /lists/:listId/todos/:todoId   done
GET     /lists/:listId/todos/:todoId   done

users :-
POST    /users/signup
POST    /users/login
GET     /users/current

*/