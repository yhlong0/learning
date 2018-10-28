## Authentication vs. Authorization: a metaphor
To help clear things up, it may be helpful to think of the problem in terms of a metaphor: chocolate vs. fudge. From the start, the nature of these two things is quite different: chocolate is an ingredient, fudge is a confection. Chocolate can be used to make many different things, and it can even be used on its own. Fudge can be made out of many different things, and one of those things might be chocolate, but it takes more than one ingredient to make fudge happen and it might not even involve chocolate. As such, it's incorrect to say that chocolate equals fudge, and it's certainly overreaching to say that chocolate equals chocolate fudge.

OAuth, in this metaphor, is chocolate. It's a versatile ingredient that is fundamental to a number of different things and can even be used on its own to great effect. Authentication is more like fudge. There are at least a few ingredients that must brought together in the right way to make it work, and OAuth can be one of these ingredients (perhaps the main ingredient) but it doesn't have to be involved at all. You need a recipe that says what to combine and how to combine them, and there are a large number of different recipes that say how that can be accomplished.


# Three Flows for authentication

Web application for company employees and outside contractors, employees use Active Directory, contractors will be managed in separated use store. The company uses Active Directory for all employees and employees will sign into the Timesheet application using their Active Directory credentials. The external contractors can sign in with a username and password. Contractors are not on ExampleCo's corporate directory. 

- App wants to authenticate and authorize each user. 
- needs to support two roles: User and Admin:

### Single Sign-On for Regular Web Apps

OAuth 2.0 with OpenID Connect (OIDC)

#### Authentication Flow

- App initiates the authentication request by redirecting the user-agent (browser) to the Authorization Server.
- Authorization Server authenticates the user (via the user-agent). The first time the user goes through this flow a consent page will be shown where the permissions that will be given to the Application are listed. The user logs in to the service (unless they are already logged in) and authorizes the application access.
- Assuming the user grants access, Authorization Server redirects the user-agent back (browser) to the Application, along with an authorization code in the querystring.
- The Application sends the authorization code to Authorization Server, along with the application credentials (client_id and client_secret), and asks for a token.
- Authorization Server authenticates the Application (using the client_id and client_secret) and validates the authorization code. If valid, Auth0 responds back with an ID Token.


The ID Token (usually referred to as id_token in code samples) is a JSON Web Token (JWT) that contains identity data. It is consumed by the application and used to get user information like the user's name, email, and so forth, typically used for UI display.

Authorization Server provides a Lock widget which serves as a login component for your application, meaning that you do not have to implement your own login screen.

#### Session Management
- Application Session: The first is the session inside the application. Even though your application uses Auth0 to authenticate users, you will still need to keep track of the fact that the user has logged in to your application. In a normal web application this is achieved by storing information inside a cookie.
- Auth0 session: Next, Auth0 will also keep a session and store the user's information inside a cookie. Next time when a user is redirected to the Auth0 Lock screen, the user's information will be remembered.
- Identity Provider session: The last layer is the Identity Provider, for example Facebook or Google. When you allow users to sign in with any of these providers, and they are already signed into the provider, they will not be prompted to sign in. They may simply be required to give permissions to share their information with Auth0 and in turn your application.


### Server Application + API









### SPA + API
