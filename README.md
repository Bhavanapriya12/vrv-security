Introduction----

This project is done by including all the requirements which were sent in the attachment through my email

1]I have implemented a dummy route that creates admin with role type "1"[**I have used this role type for role based access control**]..
2]We can enter necessary payload in the postman and can hit this route to create admin...**[**route---->user/register_admin(this route structure is included in user.js file under routes folder**)**]
3]After admin creation is done..Admin can login thorugh "user/login" route...In this Iam generating access token by using **JWT[json web token]** for secure authentication and authorisation with the token expiration of 7 days..
4]I have implemented authentication middleware to include in route to make it as authenticated routes..**[This was included in auth.js file under middlewares folder]**
5]I have used ratelimter to control no of requests especially to prevent **brute force attacks and automation** to provide proper security to the application
6]I have written the below apis
* To register main admin
  route--------->**user/register_admin**
* To login..This is for all users to login
  route---------->**user/login**
* This is for all users to get their profiles after login
  route---------->**user/get_profile**
* This is authorised to only admin to register users into application
  route--------------->**user/register_user**
* This route is only authorised to admin to get all users
  route----------->**user/get_all_users**

The above routes are included in **user.js file under routes folder** and i have done this route configuration in **routeConfig.js file under helpers folder**

7]I have organised the code in a way that all the routes are comes under routes folder...All the necessary helpers functions and files are organised under helpers folder**[**for ex--database connection,rate limiter,functions,cors..etc)****
8]I am taking payload for all apis from request..I have written joi schemas for this in **schema.js file under helpers folder**
9]I have defined mongo db schema for user model to allow only fields that are defined in that schema and defined datatypes,required fields..This is included in **user_model.js file under models folder**
10]And finally i have included all these files in app.js file to make the project running...

--------------->Note-->You can clone this,make necessary connections like mongodb , install dependencies using ****npm install** ** command and run using **node app.js** command in your local system...after running you can enter payload as i have given in schema.js file for each route and hit the route..


