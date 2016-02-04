# freeway-backend

a [Sails](http://sailsjs.org) application


#API

##Users

###Creating user's model
```
POST /users
```
**Example of the API's request:**
```
{
    "email":    "user@mail.com",
    "password": "password",
    "name":     "UserName"

}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Logged In Successfully",
  "user": {
    "ownTeams": [
      {
        "name": "Admin",
        "company": "56b343e718c168b564c98df6",
        "owner": "56b343e718c168b564c98df5",
        "createdAt": "2016-02-04T12:28:23.116Z",
        "updatedAt": "2016-02-04T12:28:23.116Z",
        "id": "56b343e718c168b564c98df7"
      }
    ],
    "ownCompanies": [
      {
        "name": "UsersName's Company",
        "owner": "56b343e718c168b564c98df5",
        "createdAt": "2016-02-04T12:28:23.112Z",
        "updatedAt": "2016-02-04T12:28:23.112Z",
        "id": "56b343e718c168b564c98df6"
      }
    ],
    "email": "user@mail.com",
    "name": "UsersName",
    "createdAt": "2016-02-04T12:28:23.103Z",
    "updatedAt": "2016-02-04T12:28:23.103Z",
    "id": "56b343e718c168b564c98df5"
  }
}
```

###Sign In
```
POST /users/login
```
**Example of the API's request:**
```
{
    "email": "user@mail.com",
    "password": "password"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Logged In Successfully",
  "user": {
    "ownTeams": [
      {
        "name": "Admin",
        "company": "56b343e718c168b564c98df6",
        "owner": "56b343e718c168b564c98df5",
        "createdAt": "2016-02-04T12:28:23.116Z",
        "updatedAt": "2016-02-04T12:28:23.116Z",
        "id": "56b343e718c168b564c98df7"
      }
    ],
    "ownCompanies": [
      {
        "name": "UsersName's Company",
        "owner": "56b343e718c168b564c98df5",
        "createdAt": "2016-02-04T12:28:23.112Z",
        "updatedAt": "2016-02-04T12:28:23.112Z",
        "id": "56b343e718c168b564c98df6"
      }
    ],
    "email": "user@mail.com",
    "name": "UsersName",
    "createdAt": "2016-02-04T12:28:23.103Z",
    "updatedAt": "2016-02-04T12:28:23.103Z",
    "id": "56b343e718c168b564c98df5"
  }
}
```

###Sign Out
```
GET /users/logout
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Logout is successful"
}
```


###Getting authorized user's profile
```
GET /users/profile
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "profile": {
    "email": "user@mail.com",
    "name": "UsersName",
    "createdAt": "2016-02-04T12:28:23.103Z",
    "updatedAt": "2016-02-04T12:28:23.103Z",
    "id": "56b343e718c168b564c98df5"
  }
}
```


##Companies

###Creating new company
```
POST /companies
```
**Example of the API's request:**
```
{
    "name": "New Company"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Company was successfully created",
  "company": {
    "name": "New Company",
    "owner": "56b343e718c168b564c98df5",
    "createdAt": "2016-02-04T13:13:55.294Z",
    "updatedAt": "2016-02-04T13:13:55.294Z",
    "id": "56b34e932d62407e669fdd0c"
  }
}
```

###Getting authenticated user's companies list
#####Answer includes companies of user only as an owner
```
GET /companies
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Companies were successfully found",
  "companies": [
    {
      "owner": "56b343e718c168b564c98df5",
      "name": "UsersName's Company",
      "createdAt": "2016-02-04T12:28:23.112Z",
      "updatedAt": "2016-02-04T12:28:23.112Z",
      "id": "56b343e718c168b564c98df6"
    },
    {
      "owner": "56b343e718c168b564c98df5",
      "name": "New Company",
      "createdAt": "2016-02-04T13:13:55.294Z",
      "updatedAt": "2016-02-04T13:13:55.294Z",
      "id": "56b34e932d62407e669fdd0c"
    }
  ]
}
```

###Updating company's profile
```
PUT /companies/:id
```
**Example of the API's request:**
```
{
    "name": "New Company2"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Company was successfully updated",
  "company": [
    {
      "name": "New Company2",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:13:55.294Z",
      "updatedAt": "2016-02-04T13:16:15.693Z",
      "id": "56b34e932d62407e669fdd0c"
    }
  ]
}
```


###Getting list of company's teams
```
GET /companies/:id/teams
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Company's teams were successfully found",
  "teams": [
    {
      "name": "New Team",
      "company": "56b34e932d62407e669fdd0c",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:18:22.614Z",
      "updatedAt": "2016-02-04T13:18:22.614Z",
      "id": "56b34f9e2d62407e669fdd0d"
    },
    {
      "name": "New Team 2",
      "company": "56b34e932d62407e669fdd0c",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:22:34.579Z",
      "updatedAt": "2016-02-04T13:22:34.579Z",
      "id": "56b3509a2d62407e669fdd10"
    }
  ]
}
```


###Getting list of company's projects
```
GET /companies/:id/projects
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Company's projects were successfully found",
  "projects": [
    {
      "name": "New Project",
      "company": "56b34e932d62407e669fdd0c",
      "slug": "new-project",
      "currency": "USD",
      "language": "en",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:21:36.298Z",
      "updatedAt": "2016-02-04T13:21:36.298Z",
      "id": "56b350602d62407e669fdd0e"
    },
    {
      "name": "New Project 2",
      "company": "56b34e932d62407e669fdd0c",
      "slug": "new-project-2",
      "currency": "USD",
      "language": "en",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:22:24.036Z",
      "updatedAt": "2016-02-04T13:22:24.036Z",
      "id": "56b350902d62407e669fdd0f"
    }
  ]
}
```


##Teams

###Creating new team
```
POST /teams
```
**Example of the API's request:**
```
{
    "name": "New Team",
    "company": "56b34e932d62407e669fdd0c"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "team": {
    "name": "New Team",
    "company": "56b34e932d62407e669fdd0c",
    "owner": "56b343e718c168b564c98df5",
    "createdAt": "2016-02-04T13:18:22.614Z",
    "updatedAt": "2016-02-04T13:18:22.614Z",
    "id": "56b34f9e2d62407e669fdd0d"
  }
}
```


###Get all user's teams
#####Answer includes teams of user only as an owner
```
GET /teams
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "teams": [
    {
      "name": "Admin",
      "company": "56b343e718c168b564c98df6",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T12:28:23.116Z",
      "updatedAt": "2016-02-04T12:28:23.116Z",
      "id": "56b343e718c168b564c98df7"
    },
    {
      "name": "New Team",
      "company": "56b34e932d62407e669fdd0c",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:18:22.614Z",
      "updatedAt": "2016-02-04T13:18:22.614Z",
      "id": "56b34f9e2d62407e669fdd0d"
    },
    {
      "name": "New Team 2",
      "company": "56b34e932d62407e669fdd0c",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:22:34.579Z",
      "updatedAt": "2016-02-04T13:22:34.579Z",
      "id": "56b3509a2d62407e669fdd10"
    }
  ]
}
```

###Updating team's profile
```
PUT /teams/:id
```
**Example of the API's request:**
```
{
    "name": "New Team 3"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Team was successfully updated",
  "team": {
    "members": [],
    "permissions": [],
    "company": {
      "name": "UsersName's Company",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T12:28:23.112Z",
      "updatedAt": "2016-02-04T12:28:23.112Z",
      "id": "56b343e718c168b564c98df6"
    },
    "owner": {
      "email": "user@mail.com",
      "name": "UsersName",
      "createdAt": "2016-02-04T12:28:23.103Z",
      "updatedAt": "2016-02-04T12:28:23.103Z",
      "id": "56b343e718c168b564c98df5"
    },
    "name": "New Team 3",
    "createdAt": "2016-02-04T12:28:23.116Z",
    "updatedAt": "2016-02-04T13:28:10.854Z",
    "id": "56b343e718c168b564c98df7"
  }
}
```

##Projects

###Checking if slug is available or not
```
GET /projects/slug/check
```
**Example of the API's request:**
```
/projects/slug/check?slug=project-name
```
**Examples of the API's answers:**
```
{
  "code": "slug.available",
  "message": "Slug name is available"
}
```
```
{
  "code": "error.slug.exists",
  "message": "Slug name is already exists"
}
```

###Creating new project
```
POST /projects
```
**Example of the API's request:**
```
{
    "name": "New Project",
    "company": "56b34e932d62407e669fdd0c",
    "slug": "new-project",
    "currency": "USD",
    "language": "en"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "project": {
    "name": "New Project",
    "company": "56b34e932d62407e669fdd0c",
    "slug": "new-project",
    "currency": "USD",
    "language": "en",
    "owner": "56b343e718c168b564c98df5",
    "createdAt": "2016-02-04T13:21:36.298Z",
    "updatedAt": "2016-02-04T13:21:36.298Z",
    "id": "56b350602d62407e669fdd0e"
  }
}
```

###Get full list of current user's projects
#####Answer includes projects of user as an owner and user as a team member
```
GET /projects
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "projects": [
    {
      "name": "New Project",
      "company": "56b34e932d62407e669fdd0c",
      "slug": "new-project",
      "currency": "USD",
      "language": "en",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:21:36.298Z",
      "updatedAt": "2016-02-04T13:21:36.298Z",
      "id": "56b350602d62407e669fdd0e"
    },
    {
      "name": "New Project 2",
      "company": "56b34e932d62407e669fdd0c",
      "slug": "new-project-2",
      "currency": "USD",
      "language": "en",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:22:24.036Z",
      "updatedAt": "2016-02-04T13:22:24.036Z",
      "id": "56b350902d62407e669fdd0f"
    }
  ]
}
```


```
PUT /projects/:id
```
**Example of the API's request:**
```
{
    "name": "New Project 3"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Project was successfully updated",
  "project": {
    "permissions": [],
    "company": {
      "name": "New Company2",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:13:55.294Z",
      "updatedAt": "2016-02-04T13:16:15.693Z",
      "id": "56b34e932d62407e669fdd0c"
    },
    "owner": {
      "email": "user@mail.com",
      "name": "UsersName",
      "createdAt": "2016-02-04T12:28:23.103Z",
      "updatedAt": "2016-02-04T12:28:23.103Z",
      "id": "56b343e718c168b564c98df5"
    },
    "name": "New Project 3",
    "slug": "new-project",
    "currency": "USD",
    "language": "en",
    "createdAt": "2016-02-04T13:21:36.298Z",
    "updatedAt": "2016-02-04T13:32:59.056Z",
    "id": "56b350602d62407e669fdd0e"
  }
}
```
