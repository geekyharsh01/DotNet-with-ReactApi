# User Management Application

This repository contains a full-stack web application for managing users. The backend is implemented using .NET Web API, and the frontend is implemented using React.
This Application do CRUD operations, We can add the user details using the form and then see all the list of added users in the Userlist and there we can Update the user information or delete that user information.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed:

- .NET 8 SDK
- Node.js[v20.13.1] and npm[10.8.0]

## Installation

1. Clone the repository to your local machine:

```bash
git clone [https://github.com/your-username/user-management.git](https://github.com/geekyharsh01/DotNet-with-ReactApi.git)
```

### Start the server
```bash
cd UserInfoApi
dotnet run
```
### Start the Client
```bash
cd userapp
npm start
```
### Important
In the frontend react App check for the port on which request is happening. For me the port is - http://localhost:5227/ on which backend server is hosted(DotNet WebApi).
If your DotNet WebApi are hosted on different port, either you can change the port in launchSettings.json or you can change the port in the React application to the one on which your DotNet Web Api is hosted.

