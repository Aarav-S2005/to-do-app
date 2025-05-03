const express = require('express');
const router = require("./routes/route")
const app = express();

app.use(express.json());
app.use("/", router);

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
POST    /users/signup                  done
POST    /users/login                   done
GET     /users/current                 done

*/