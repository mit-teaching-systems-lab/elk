# elk
An educational, roleplay game for teachers to practice eliciting learner knowledge

CREATE TABLE chat_messages (
 id serial primary key,
 game_id integer,
 player text,
 message text,
 timestamp timestamp
);

Setup
---
 
```
npm install
```
 
 
Compile
---
 
```
npm run compile 
```

Run
---
 
```
node server.js
```

Deployed at https://tsl-elk.herokuapp.com/