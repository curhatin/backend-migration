# api
Curhatin API

| name        | link                                            | param                                                            |
|-------------|-------------------------------------------------|------------------------------------------------------------------|
| Register    | https://curhatin.herokuapp.com/account/register | {fname : string, email : string , password :string}              |
| Login       | https://curhatin.herokuapp.com/account/login    | {email : string , password : string}                             |
| tag         | https://curhatin.herokuapp.com/tag              | {tag:string}                                                     |
| post        | https://curhatin.herokuapp.com/post/add         | {postId : integer , tagId: integer , post : text , topic : text} |
| comment     | https://curhatin.herokuapp.com/comment/add      | {postId : integer , accountId : integer , comments : TEXT}       |
| postComment get some | https://curhatin.herokuapp.com/postcomment/get  | {postId : integer}                                               |
| get me | https://curhatin.herokuapp.com/account/me  | {token}                                               |
| postComment get all | https://curhatin.herokuapp.com/postcomment/getall  | |
