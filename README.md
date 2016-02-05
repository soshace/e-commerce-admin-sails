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

###Update user
**Danger Zone | TODO: Need to close access for updating email, companies, password from here**
```
PUT /users/:id
```
**Example of the API's request:**
```
{
    "email": "user2@mail.com",
    "password": "password",
    "name": "UsersName"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "User was updated successfully",
  "user": {
    "email": "user2@mail.com",
    "name": "UsersName",
    "createdAt": "2016-02-05T08:55:05.563Z",
    "id": "56b463697054d850020f3c78"
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
**Danger Zone | TODO: need to close access for updating teams, projects**
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
  "company": {
    "name": "New Company2",
    "updatedAt": "2016-02-05T11:43:17.042Z",
    "id": "56b463697054d850020f3c79"
  }
}
```

###Getting company's profile
```
GET /companies/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Company was successfully found",
  "company": {
    "teams": [
      {
        "name": "New Team 3",
        "company": "56b343e718c168b564c98df6",
        "owner": "56b343e718c168b564c98df5",
        "createdAt": "2016-02-04T12:28:23.116Z",
        "updatedAt": "2016-02-04T13:28:10.854Z",
        "id": "56b343e718c168b564c98df7"
      }
    ],
    "projects": [],
    "owner": "56b343e718c168b564c98df5",
    "name": "UsersName's Company",
    "createdAt": "2016-02-04T12:28:23.112Z",
    "updatedAt": "2016-02-04T12:28:23.112Z",
    "id": "56b343e718c168b564c98df6"
  }
}
```

###Delete company
```
DELETE /companies/:id
```
**Example of the API's answer:**
**Danger Zone | TODO: need to check teams, projects before removing**
```
{
  "code": "successful",
  "message": "Company was removed successfully",
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

###Get team by id
```
GET /teams/:id
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "team": {
    "members": [],
    "permissions": [],
    "company": "56b343e718c168b564c98df6",
    "owner": "56b343e718c168b564c98df5",
    "name": "New Team 3",
    "createdAt": "2016-02-04T12:28:23.116Z",
    "updatedAt": "2016-02-04T13:28:10.854Z",
    "id": "56b343e718c168b564c98df7"
  }
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
    "id": "56b463697054d850020f3c7a",
    "name": "New Team 3",
    "createdAt": "2016-02-05T08:55:05.611Z",
    "updatedAt": "2016-02-05T11:48:23.790Z"
  }
}
```


###Remove team
```
DELETE /teams/:id
```
**Example of the API's answer:**
**Danger Zone | TODO: need to check Permissions before moving**
```
{
  "code": "successful",
  "message": "Team was removed successfully",
  "team": [
    {
      "name": "New Team 3",
      "company": "56b343e718c168b564c98df6",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T12:28:23.116Z",
      "updatedAt": "2016-02-04T13:28:10.854Z",
      "id": "56b343e718c168b564c98df7"
    }
  ]
}
```

##Projects

###Checking if slug is available or not
```
GET /projects/slug/check/:slugName
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

###Get one project by id
```
GET /projects/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Project was successfully found",
  "project": {
    "permissions": [],
    "company": "56b34e932d62407e669fdd0c",
    "owner": "56b343e718c168b564c98df5",
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

```
PUT /projects/:id
```
**Example of the API's request:**
```
{
    "name": "New Project"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Project was successfully updated",
  "project": {
    "id": "56b48196a4bcf8c3058d8e8e",
    "name": "New Project",
    "createdAt": "2016-02-05T11:03:50.540Z",
    "updatedAt": "2016-02-05T11:53:01.106Z",
    "company": "56b463697054d850020f3c79",
    "owner": "56b463697054d850020f3c78"
  }
}
```


```
DELETE /projects/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Project was removed successfully",
  "project": [
    {
      "name": "New Project 3",
      "company": "56b34e932d62407e669fdd0c",
      "slug": "new-project",
      "currency": "USD",
      "language": "en",
      "owner": "56b343e718c168b564c98df5",
      "createdAt": "2016-02-04T13:21:36.298Z",
      "updatedAt": "2016-02-04T13:32:59.056Z",
      "id": "56b350602d62407e669fdd0e"
    }
  ]
}
```

##Products

###Creating new product
```
POST /products
```
**Example of the API's request:**
```
{
    "name": "Product",
    "project": "56b4aeff00231f4a0a376ad9"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "project": {
    "name": "Product",
    "project": "56b4aeff00231f4a0a376ad9",
    "owner": "56b4aebb00231f4a0a376ad6",
    "createdAt": "2016-02-05T14:17:56.449Z",
    "updatedAt": "2016-02-05T14:17:56.449Z",
    "id": "56b4af1400231f4a0a376ada"
  }
}
```

###Get full list of current user's products
#####Answer includes products of user as an owner and which he has rights access
```
GET /products
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "products": [
    {
      "owner": "56b4aebb00231f4a0a376ad6",
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Product",
      "createdAt": "2016-02-05T14:17:56.449Z",
      "updatedAt": "2016-02-05T14:17:56.449Z",
      "id": "56b4af1400231f4a0a376ada"
    },
    {
      "owner": "56b4aebb00231f4a0a376ad6",
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Product1",
      "createdAt": "2016-02-05T14:51:08.599Z",
      "updatedAt": "2016-02-05T14:51:08.599Z",
      "id": "56b4b6dcedd0d3410bf42b92"
    },
    {
      "owner": "56b4aebb00231f4a0a376ad6",
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Product2",
      "createdAt": "2016-02-05T16:05:44.624Z",
      "updatedAt": "2016-02-05T16:05:44.624Z",
      "id": "56b4c8587f2a24df104b825c"
    }
  ]
}
```

###Get one product by id
```
GET /products/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully found",
  "project": {
    "owner": "56b4aebb00231f4a0a376ad6",
    "project": "56b4aeff00231f4a0a376ad9",
    "name": "Product",
    "createdAt": "2016-02-05T14:17:56.449Z",
    "updatedAt": "2016-02-05T14:17:56.449Z",
    "id": "56b4af1400231f4a0a376ada"
  }
}
```

```
PUT /products/:id
```
**Example of the API's request:**
```
{
    "name": "New Product"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully updated",
  "product": {
    "id": "56b4af1400231f4a0a376ada",
    "name": "New Product",
    "createdAt": "2016-02-05T14:17:56.449Z",
    "updatedAt": "2016-02-05T16:08:51.125Z"
  }
}
```


```
DELETE /products/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was removed successfully",
  "product": [
    {
      "name": "New Product",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T14:17:56.449Z",
      "updatedAt": "2016-02-05T16:08:51.125Z",
      "id": "56b4af1400231f4a0a376ada"
    }
  ]
}
```


##Categories

###Creating new category
```
POST /categories
```
**Example of the API's request:**
```
{
    "name": "Category",
    "project": "56b4aeff00231f4a0a376ad9"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "category": {
    "name": "Category",
    "project": "56b4aeff00231f4a0a376ad9",
    "owner": "56b4aebb00231f4a0a376ad6",
    "createdAt": "2016-02-05T16:15:56.066Z",
    "updatedAt": "2016-02-05T16:15:56.066Z",
    "id": "56b4cabcedc18b7925e6e98b"
  }
}
```

###Get full list of current user's categories
#####Answer includes products of user as an owner and which he has rights access
```
GET /categories
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "categories": [
    {
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Category",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T16:15:56.066Z",
      "updatedAt": "2016-02-05T16:15:56.066Z",
      "id": "56b4cabcedc18b7925e6e98b"
    },
    {
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Category1",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T16:16:36.197Z",
      "updatedAt": "2016-02-05T16:16:36.197Z",
      "id": "56b4cae4edc18b7925e6e98c"
    },
    {
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Category2",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T16:16:45.471Z",
      "updatedAt": "2016-02-05T16:16:45.471Z",
      "id": "56b4caededc18b7925e6e98d"
    }
  ]
}
```

###Get one product by id
```
GET /categories/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully found",
  "project": {
    "owner": "56b4aebb00231f4a0a376ad6",
    "project": "56b4aeff00231f4a0a376ad9",
    "name": "Product",
    "createdAt": "2016-02-05T14:17:56.449Z",
    "updatedAt": "2016-02-05T14:17:56.449Z",
    "id": "56b4af1400231f4a0a376ada"
  }
}
```

```
PUT /categories/:id
```
**Example of the API's request:**
```
{
    "name": "Category New",
    "project": "56b4aeff00231f4a0a376ad9"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Category was successfully updated",
  "category": {
    "id": "56b4cabcedc18b7925e6e98b",
    "name": "Category New",
    "createdAt": "2016-02-05T16:15:56.066Z",
    "updatedAt": "2016-02-05T16:21:27.976Z"
  }
}
```


```
DELETE /categories/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Category was removed successfully",
  "category": [
    {
      "name": "Category New",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T16:15:56.066Z",
      "updatedAt": "2016-02-05T16:21:27.976Z",
      "id": "56b4cabcedc18b7925e6e98b"
    }
  ]
}
```
