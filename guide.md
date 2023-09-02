jsonwebtoken for genrating tokens and store them after in the cookies of the browser
dot env load for all private variables ( data that we wanted to be hiden neither for the front end or the back end) / when we push the project in github these data wel bi ignored with gotignore  / data like connecting to data base
cors to protect server form getting acess by the front end ( like sending queries to get data / tokens or cookies) limited only for provided domains name or origins to get data 
cooki parser : front end send cooki(within the token is stored) with request / http is stateless 
bcrypt : aplly hashing for the password 


.env : the name of the variable is uppercase and seperate word with _