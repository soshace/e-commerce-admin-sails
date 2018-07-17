# freeway-backend

a [Sails](http://sailsjs.org) application

# Installation
* Install MongoDB and create database with a user (do not forget to set database name, user name and user password via environment variables)
* Install Redis `$ sudo apt-get install redis-server`
* Install NodeJS (and npm if not installed with node)
* Export environment variables
* Install npm packages `$ npm install`

#NODE ENV

##Examples
```
export  EMAIL_ADDRESS='user@mail.com'
export  EMAIL_PASSWORD='123123'
export EMAIL_SERVICE='yandex'
export  PROTOCOL='http'
export  PORT='1337'
export DATABASE='freeway'
export DATABASE_USER='user'
export DATABASE_PASSWORD='password'
export SESSION_SECRET='359619ad07ab7195dc8cbfa6b0f8a3d8'
export UPLOAD_FOLDER='/var/www/'
export IMG_ROOT_URI ='hello'
export SERVER_URL='http://45.55.60.139:1337'
export  HOST='45.55.60.139'
```



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
    "teams": [
      {
        "name": "Administrators",
        "company": "56c1da12dd5e18762e6ad2b1",
        "owner": "56c1da12dd5e18762e6ad2b0",
        "createdAt": "2016-02-15T14:00:50.487Z",
        "updatedAt": "2016-02-15T14:00:50.532Z",
        "id": "56c1da12dd5e18762e6ad2b2"
      }
    ],
    "ownTeams": [
      {
        "name": "Administrators",
        "company": "56c1da12dd5e18762e6ad2b1",
        "owner": "56c1da12dd5e18762e6ad2b0",
        "createdAt": "2016-02-15T14:00:50.487Z",
        "updatedAt": "2016-02-15T14:00:50.532Z",
        "id": "56c1da12dd5e18762e6ad2b2"
      }
    ],
    "ownCompanies": [
      {
        "name": "UserName's Company",
        "owner": "56c1da12dd5e18762e6ad2b0",
        "createdAt": "2016-02-15T14:00:50.472Z",
        "updatedAt": "2016-02-15T14:00:50.472Z",
        "id": "56c1da12dd5e18762e6ad2b1"
      }
    ],
    "email": "user@mail.com",
    "name": "UserName",
    "createdAt": "2016-02-15T14:00:50.391Z",
    "updatedAt": "2016-02-15T14:00:50.391Z",
    "id": "56c1da12dd5e18762e6ad2b0"
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
    "teams": [
      {
        "name": "Administrators",
        "company": "56c1da12dd5e18762e6ad2b1",
        "owner": "56c1da12dd5e18762e6ad2b0",
        "createdAt": "2016-02-15T14:00:50.487Z",
        "updatedAt": "2016-02-15T14:00:50.532Z",
        "id": "56c1da12dd5e18762e6ad2b2"
      }
    ],
    "ownTeams": [
      {
        "name": "Administrators",
        "company": "56c1da12dd5e18762e6ad2b1",
        "owner": "56c1da12dd5e18762e6ad2b0",
        "createdAt": "2016-02-15T14:00:50.487Z",
        "updatedAt": "2016-02-15T14:00:50.532Z",
        "id": "56c1da12dd5e18762e6ad2b2"
      }
    ],
    "ownCompanies": [
      {
        "name": "UserName's Company",
        "owner": "56c1da12dd5e18762e6ad2b0",
        "createdAt": "2016-02-15T14:00:50.472Z",
        "updatedAt": "2016-02-15T14:00:50.472Z",
        "id": "56c1da12dd5e18762e6ad2b1"
      }
    ],
    "email": "user@mail.com",
    "name": "UserName",
    "createdAt": "2016-02-15T14:00:50.391Z",
    "updatedAt": "2016-02-15T14:00:50.391Z",
    "id": "56c1da12dd5e18762e6ad2b0"
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
      "members": [],
      "permissions": [
        {
          "project": "56bf272bf428323e3cbabf4d",
          "team": "56bf203f694dbab301612773",
          "productsPermission": "none",
          "ordersPermission": "none",
          "customersPermission": "none",
          "createdAt": "2016-02-13T12:52:59.323Z",
          "updatedAt": "2016-02-13T12:52:59.323Z",
          "id": "56bf272bf428323e3cbabf51"
        },
        {
          "project": "56bf2738f428323e3cbabf56",
          "team": "56bf203f694dbab301612773",
          "productsPermission": "none",
          "ordersPermission": "none",
          "customersPermission": "none",
          "createdAt": "2016-02-13T12:53:12.518Z",
          "updatedAt": "2016-02-13T12:53:12.518Z",
          "id": "56bf2738f428323e3cbabf5a"
        }
      ],
      "company": "56bca31261a92b870f3e2562",
      "owner": "56bca31261a92b870f3e2561",
      "name": "New team",
      "createdAt": "2016-02-13T12:23:27.783Z",
      "updatedAt": "2016-02-13T12:23:27.783Z",
      "id": "56bf203f694dbab301612773"
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

###DEPRECATED
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
**Examples of the API's answers:**
**Danger Zone | TODO: need to check Permissions before moving ahead**
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

```
{
  "code": "forbidden",
  "message": "You are not able to delete Administrator's team"
}
```

###Get team's permissions by id
```
GET /teams/:id/permissions
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "permissions": [
    {
      "project": "56bf26dda7d22db31f282771",
      "team": "56bf2e0070e8b19272eaa385",
      "owner": "56bca31261a92b870f3e2561",
      "productsPermission": "manage",
      "ordersPermission": "view",
      "customersPermission": "view",
      "createdAt": "2016-02-13T13:22:08.435Z",
      "updatedAt": "2016-02-13T13:31:56.263Z",
      "id": "56bf2e0070e8b19272eaa386"
    },
    {
      "project": "56bf272bf428323e3cbabf4d",
      "team": "56bf2e0070e8b19272eaa385",
      "owner": "56bca31261a92b870f3e2561",
      "productsPermission": "none",
      "ordersPermission": "none",
      "customersPermission": "none",
      "createdAt": "2016-02-13T13:22:08.439Z",
      "updatedAt": "2016-02-13T13:22:08.439Z",
      "id": "56bf2e0070e8b19272eaa387"
    }
  ]
}
```


###Delete team's members by id
```
DELETE /teams/:id/members/:memberId
```

**Examples of the API's answers:**
```
{
  "code": "successful",
  "message": "Team member was removed successfully",
  "team": {
    "members": [],
    "permissions": [],
    "company": {
      "name": "Niki's Company",
      "owner": "56c1e3b896f2c5b67b4cee93",
      "createdAt": "2016-02-15T14:42:00.811Z",
      "updatedAt": "2016-02-15T14:42:00.811Z",
      "id": "56c1e3b896f2c5b67b4cee94"
    },
    "owner": {
      "email": "niki5@mail.ru",
      "name": "Niki",
      "createdAt": "2016-02-15T14:42:00.755Z",
      "updatedAt": "2016-02-15T14:42:00.755Z",
      "id": "56c1e3b896f2c5b67b4cee93"
    },
    "name": "Administrators",
    "admin": true,
    "createdAt": "2016-02-15T14:42:00.827Z",
    "updatedAt": "2016-02-15T15:03:49.465Z",
    "id": "56c1e3b896f2c5b67b4cee95"
  }
}
```

```
{
  "code": "forbidden",
  "message": "You are not able to delete last user in Administrator's team"
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
    "id": "56b350602d62407e669fdd0e",
    "client": {
          "clientId": "Xs5HSxGNegqwtFiQ331toZPYWof4wTUX",
          "createdAt": "2016-02-28T13:22:18.266Z",
          "updatedAt": "2016-02-28T13:22:18.266Z",
          "id": "56d2f48ab1f81d7d31efd20b"
        },
  }
}
```

###Get project's categories by id
```
GET /projects/:id/categories
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "categories": [
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

###Get project's products by id
```
GET /projects/:id/products
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "products": [
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
      "name": "Product1",
      "createdAt": "2016-02-05T16:05:44.624Z",
      "updatedAt": "2016-02-05T16:05:44.624Z",
      "id": "56b4c8587f2a24df104b825c"
    }
  ]
}
```


###Get project's products by id + pagination
```
GET /projects/:id/products?limit=:limit&page=:page
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "products": [
    {
      "owner": "56c878c8f5efcfa62ad4898e",
      "project": "56c879b1f5efcfa62ad48992",
      "productType": "56c879b1f5efcfa62ad48993",
      "name": "New Product2",
      "createdAt": "2016-02-22T13:17:32.919Z",
      "updatedAt": "2016-02-22T13:17:32.919Z",
      "id": "56cb0a6c32354fa868b7a9f9"
    }
  ],
  "amount": 3
}
```

###Get project's Product Types by id
```
GET /projects/:id/product_types
```
**Example of the API's answer:**
```
{
     "code": "successful",
     "productTypes": [
       {
         "owner": "56b9d8ffd2c1e9d07e64b8f1",
         "project": "56b9d92cd2c1e9d07e64b8f4",
         "name": "Sample Product Type2",
         "description": "New Product Type2",
         "createdAt": "2016-02-09T12:18:52.669Z",
         "updatedAt": "2016-02-09T12:36:18.427Z",
         "id": "56b9d92cd2c1e9d07e64b8f5"
       },
       {
         "owner": "56b9d8ffd2c1e9d07e64b8f1",
         "project": "56b9d92cd2c1e9d07e64b8f4",
         "name": "New Product Type",
         "description": "New Product Type2",
         "createdAt": "2016-02-09T12:28:52.053Z",
         "updatedAt": "2016-02-09T12:28:52.053Z",
         "id": "56b9db84c314585b15856ac6"
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

###Get project's permissions by id
```
GET /projects/:id/permissions
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "permissions": [
    {
      "project": "56bf26dda7d22db31f282771",
      "team": "56bf2e0070e8b19272eaa385",
      "owner": "56bca31261a92b870f3e2561",
      "productsPermission": "manage",
      "ordersPermission": "view",
      "customersPermission": "view",
      "createdAt": "2016-02-13T13:22:08.435Z",
      "updatedAt": "2016-02-13T13:31:56.263Z",
      "id": "56bf2e0070e8b19272eaa386"
    },
    {
      "project": "56bf26dda7d22db31f282771",
      "team": "56bf2e5470e8b19272eaa389",
      "owner": "56bca31261a92b870f3e2561",
      "productsPermission": "none",
      "ordersPermission": "none",
      "customersPermission": "none",
      "createdAt": "2016-02-13T13:23:32.999Z",
      "updatedAt": "2016-02-13T13:23:32.999Z",
      "id": "56bf2e5570e8b19272eaa38a"
    }
  ]
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

###DEPRECATED
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

###DEPRECATED
###Get full list of current user's products + search + pagination
#####Answer includes products of user as an owner and which he has rights access
```
GET /products/?name=:productName&page=:pageNumber&limit=:limitPerPage
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "products": [
    {
      "owner": "56b4aebb00231f4a0a376ad6",
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Product1",
      "createdAt": "2016-02-05T16:05:44.624Z",
      "updatedAt": "2016-02-05T16:05:44.624Z",
      "id": "56b4c8587f2a24df104b825c"
    },
    {
      "owner": "56b4aebb00231f4a0a376ad6",
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Product1",
      "createdAt": "2016-02-08T17:53:22.387Z",
      "updatedAt": "2016-02-08T17:53:22.387Z",
      "id": "56b8d612880d72b375adc214"
    },
    {
      "owner": "56b4aebb00231f4a0a376ad6",
      "project": "56b4aeff00231f4a0a376ad9",
      "name": "Product1",
      "createdAt": "2016-02-08T17:53:25.588Z",
      "updatedAt": "2016-02-08T17:53:25.588Z",
      "id": "56b8d615880d72b375adc215"
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
  "product": {
    "owner": "56b4aebb00231f4a0a376ad6",
    "project": "56b4aeff00231f4a0a376ad9",
    "name": "Product",
    "createdAt": "2016-02-05T14:17:56.449Z",
    "updatedAt": "2016-02-05T14:17:56.449Z",
    "id": "56b4af1400231f4a0a376ada"
  }
}
```


###Update product by id
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

###Delete product by id
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

###DEPRECATED
###Get categories by product
```
GET /products/:id/categories
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "categories": [
    {
      "name": "Category1",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T16:16:36.197Z",
      "updatedAt": "2016-02-08T16:43:19.229Z",
      "id": "56b4cae4edc18b7925e6e98c"
    }
  ]
}
```

###Get variants by product
```
GET /products/:id/variants
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "variants": [
    {
      "attributes": [
        {
          "productAttribute": "56bb40cb9ad54c174c616204",
          "variant": "56bb5a8f76b2aabd0b0b3e1e",
          "createdAt": "2016-02-10T15:43:11.723Z",
          "updatedAt": "2016-02-10T15:43:11.723Z",
          "id": "56bb5a8f76b2aabd0b0b3e1f"
        },
        {
          "productAttribute": "56bb44d1c9f8299171ffb4c0",
          "variant": "56bb5a8f76b2aabd0b0b3e1e",
          "createdAt": "2016-02-10T15:43:11.725Z",
          "updatedAt": "2016-02-10T15:43:11.725Z",
          "id": "56bb5a8f76b2aabd0b0b3e20"
        }
      ],
      "owner": "56bb2c1684dfb5cf1d49e2c7",
      "productType": "56bb3bd62d2e92ba1e9551dc",
      "product": "56bb5a8f76b2aabd0b0b3e1d",
      "isMaster": true,
      "createdAt": "2016-02-10T15:43:11.675Z",
      "updatedAt": "2016-02-10T15:43:11.675Z",
      "id": "56bb5a8f76b2aabd0b0b3e1e"
    }
  ]
}
```

###DEPRECATED
###Get images by product
```
GET /products/:id/images
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "images": [
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "http://45.55.60.139/de719f7b-9a50-464e-bbd8-4cda10e72272.jpg",
      "external": false,
      "createdAt": "2016-02-11T15:29:49.810Z",
      "updatedAt": "2016-02-11T15:29:49.810Z",
      "id": "56bca8eddfcee6d642b0a87c"
    },
    {
      "owner": "56bca31261a92b870f3e2561",
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "https://writeitdown31days.files.wordpress.com/2015/13/hello-picture.gif",
      "external": true,
      "createdAt": "2016-02-11T15:54:18.821Z",
      "updatedAt": "2016-02-11T15:54:18.822Z",
      "id": "56bcaeaaa512b145550febe1"
    }
  ]
}
```

###DEPRECATED
###Get prices by product
```
GET /products/:id/prices
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "prices": [
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "owner": "56bca31261a92b870f3e2561",
      "price": 12.12,
      "createdAt": "2016-02-11T18:42:48.671Z",
      "updatedAt": "2016-02-11T18:42:48.671Z",
      "id": "56bcd628b6ef43c946c15f43"
    },
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "owner": "56bca31261a92b870f3e2561",
      "price": 12.13,
      "createdAt": "2016-02-11T18:42:59.281Z",
      "updatedAt": "2016-02-11T18:42:59.281Z",
      "id": "56bcd633b6ef43c946c15f44"
    }
  ]
}
```

###Add relation between category and product
```
POST /products/:id/categories/:categoryId
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "product": {
    "categories": [
      {
        "name": "Category1",
        "project": "56b4aeff00231f4a0a376ad9",
        "owner": "56b4aebb00231f4a0a376ad6",
        "createdAt": "2016-02-05T16:16:36.197Z",
        "updatedAt": "2016-02-08T16:43:19.229Z",
        "id": "56b4cae4edc18b7925e6e98c"
      },
      {
        "name": "Category2",
        "project": "56b4aeff00231f4a0a376ad9",
        "owner": "56b4aebb00231f4a0a376ad6",
        "createdAt": "2016-02-05T16:16:45.471Z",
        "updatedAt": "2016-02-05T16:16:45.471Z",
        "id": "56b4caededc18b7925e6e98d"
      }
    ],
    "owner": {
      "email": "user@mail.com",
      "name": "UsersName",
      "createdAt": "2016-02-05T14:16:27.193Z",
      "updatedAt": "2016-02-05T14:16:27.193Z",
      "id": "56b4aebb00231f4a0a376ad6"
    },
    "project": {
      "name": "Project1",
      "company": "56b4aebb00231f4a0a376ad7",
      "slug": "project1",
      "language": "en",
      "currency": "USD",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T14:17:35.807Z",
      "updatedAt": "2016-02-05T14:17:35.807Z",
      "id": "56b4aeff00231f4a0a376ad9"
    },
    "name": "Name 2",
    "createdAt": "2016-02-05T14:51:08.599Z",
    "updatedAt": "2016-02-08T16:51:17.578Z",
    "id": "56b4b6dcedd0d3410bf42b92"
  }
}
```

###Delete relation between product and category
```
DELETE /products/:id/categories/:categoryId
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "product": {
    "categories": [
      {
        "name": "Category1",
        "project": "56b4aeff00231f4a0a376ad9",
        "owner": "56b4aebb00231f4a0a376ad6",
        "createdAt": "2016-02-05T16:16:36.197Z",
        "updatedAt": "2016-02-08T16:43:19.229Z",
        "id": "56b4cae4edc18b7925e6e98c"
      }
    ],
    "owner": {
      "email": "user@mail.com",
      "name": "UsersName",
      "createdAt": "2016-02-05T14:16:27.193Z",
      "updatedAt": "2016-02-05T14:16:27.193Z",
      "id": "56b4aebb00231f4a0a376ad6"
    },
    "project": {
      "name": "Project1",
      "company": "56b4aebb00231f4a0a376ad7",
      "slug": "project1",
      "language": "en",
      "currency": "USD",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T14:17:35.807Z",
      "updatedAt": "2016-02-05T14:17:35.807Z",
      "id": "56b4aeff00231f4a0a376ad9"
    },
    "name": "Name 2",
    "createdAt": "2016-02-05T14:51:08.599Z",
    "updatedAt": "2016-02-08T16:52:44.665Z",
    "id": "56b4b6dcedd0d3410bf42b92"
  }
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

###DEPRECATED
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

###Get one category by id
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

###Update category by id
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

###Delete category by id
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

###Get products by category
```
GET /categories/:id/products
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "products": [
    {
      "name": "Name 2",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T14:51:08.599Z",
      "updatedAt": "2016-02-08T15:27:33.567Z",
      "id": "56b4b6dcedd0d3410bf42b92"
    },
    {
      "name": "Product1",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T16:05:44.624Z",
      "updatedAt": "2016-02-05T16:05:44.624Z",
      "id": "56b4c8587f2a24df104b825c"
    }
  ]
}
```

###Get products by category + search + pagination
```
GET /categories/:id/products?name=:productName&page=:pageNumber&limit=:limitPerPage
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "products": [
    {
      "name": "Product1",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-08T17:53:22.387Z",
      "updatedAt": "2016-02-08T17:53:22.387Z",
      "id": "56b8d612880d72b375adc214"
    },
    {
      "name": "Product1",
      "project": "56b4aeff00231f4a0a376ad9",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-08T17:53:25.588Z",
      "updatedAt": "2016-02-08T17:53:25.588Z",
      "id": "56b8d615880d72b375adc215"
    }
  ]
}
```

###Add relation between category and product
```
POST /categories/:id/products/:productId
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "category": {
    "products": [
      {
        "name": "Name 2",
        "project": "56b4aeff00231f4a0a376ad9",
        "owner": "56b4aebb00231f4a0a376ad6",
        "createdAt": "2016-02-05T14:51:08.599Z",
        "updatedAt": "2016-02-08T15:27:33.567Z",
        "id": "56b4b6dcedd0d3410bf42b92"
      },
      {
        "name": "Product1",
        "project": "56b4aeff00231f4a0a376ad9",
        "owner": "56b4aebb00231f4a0a376ad6",
        "createdAt": "2016-02-05T16:05:44.624Z",
        "updatedAt": "2016-02-05T16:05:44.624Z",
        "id": "56b4c8587f2a24df104b825c"
      }
    ],
    "project": {
      "name": "Project1",
      "company": "56b4aebb00231f4a0a376ad7",
      "slug": "project1",
      "language": "en",
      "currency": "USD",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T14:17:35.807Z",
      "updatedAt": "2016-02-05T14:17:35.807Z",
      "id": "56b4aeff00231f4a0a376ad9"
    },
    "name": "Category1",
    "owner": "56b4aebb00231f4a0a376ad6",
    "createdAt": "2016-02-05T16:16:36.197Z",
    "updatedAt": "2016-02-08T16:39:31.694Z",
    "id": "56b4cae4edc18b7925e6e98c"
  }
}
```

###Delete relation between category and product
```
DELETE /categories/:id/products/:productId
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "category": {
    "products": [
      {
        "name": "Name 2",
        "project": "56b4aeff00231f4a0a376ad9",
        "owner": "56b4aebb00231f4a0a376ad6",
        "createdAt": "2016-02-05T14:51:08.599Z",
        "updatedAt": "2016-02-08T15:27:33.567Z",
        "id": "56b4b6dcedd0d3410bf42b92"
      }
    ],
    "project": {
      "name": "Project1",
      "company": "56b4aebb00231f4a0a376ad7",
      "slug": "project1",
      "language": "en",
      "currency": "USD",
      "owner": "56b4aebb00231f4a0a376ad6",
      "createdAt": "2016-02-05T14:17:35.807Z",
      "updatedAt": "2016-02-05T14:17:35.807Z",
      "id": "56b4aeff00231f4a0a376ad9"
    },
    "name": "Category1",
    "owner": "56b4aebb00231f4a0a376ad6",
    "createdAt": "2016-02-05T16:16:36.197Z",
    "updatedAt": "2016-02-08T16:05:11.847Z",
    "id": "56b4cae4edc18b7925e6e98c"
  }
}
```

##ProductType

###Creating new ProductType
```
POST /product_types
```
**Example of the API's request:**
```
{
    "name":"New Product Type",
    "description": "New Product Type2",
    "project":"56b9d92cd2c1e9d07e64b8f4"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "productType": {
    "name": "New Product Type",
    "description": "New Product Type2",
    "project": "56b9d92cd2c1e9d07e64b8f4",
    "owner": "56b9d8ffd2c1e9d07e64b8f1",
    "createdAt": "2016-02-09T12:28:52.053Z",
    "updatedAt": "2016-02-09T12:28:52.053Z",
    "id": "56b9db84c314585b15856ac6"
  }
}
```

###DEPRECATED
###Get full list of current user's ProductTypes
#####Answer includes products of user as an owner and which he has rights access
```
GET /product_types
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "productTypes": [
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "project": "56b9d92cd2c1e9d07e64b8f4",
      "name": "Sample Product Type",
      "description": "New Product Type2",
      "createdAt": "2016-02-09T12:18:52.669Z",
      "updatedAt": "2016-02-09T12:21:34.398Z",
      "id": "56b9d92cd2c1e9d07e64b8f5"
    },
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "project": "56b9d92cd2c1e9d07e64b8f4",
      "name": "New Product Type",
      "description": "New Product Type2",
      "createdAt": "2016-02-09T12:28:52.053Z",
      "updatedAt": "2016-02-09T12:28:52.053Z",
      "id": "56b9db84c314585b15856ac6"
    }
  ]
}
```

###Get one Product Type by id
```
GET /product_types/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully found",
  "productType": {
    "owner": "56b9d8ffd2c1e9d07e64b8f1",
    "project": "56b9d92cd2c1e9d07e64b8f4",
    "name": "Sample Product Type",
    "description": "New Product Type2",
    "createdAt": "2016-02-09T12:18:52.669Z",
    "updatedAt": "2016-02-09T12:21:34.398Z",
    "id": "56b9d92cd2c1e9d07e64b8f5"
  }
}
```

###Update Product Type by id
```
PUT /product_types/:id
```
**Example of the API's request:**
```
{
    "name": "Sample Product Type2"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully updated",
  "productType": {
    "id": "56b9d92cd2c1e9d07e64b8f5",
    "name": "Sample Product Type2",
    "description": "New Product Type2",
    "createdAt": "2016-02-09T12:18:52.669Z",
    "updatedAt": "2016-02-09T12:36:18.427Z"
  }
}
```

###Delete Product Type by id
```
DELETE /product_types/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product type was removed successfully",
  "productType": [
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "name": "Sample Product Type2",
      "description": "New Product Type2",
      "project": "56b9d92cd2c1e9d07e64b8f4",
      "createdAt": "2016-02-09T12:18:52.669Z",
      "updatedAt": "2016-02-09T12:36:18.427Z",
      "id": "56b9d92cd2c1e9d07e64b8f5"
    }
  ]
}
```

###Get one Product Attributes of Product Type
```
GET /product_types/:id/product_attributes
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "productAttributes": [
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "productType": "56b9d92cd2c1e9d07e64b8f5",
      "name": "Product Attribute3",
      "label": "Product Attribute Label",
      "attributeType": "text",
      "constraints": "none",
      "isRequired": false,
      "isSearchable": true,
      "createdAt": "2016-02-09T16:36:10.430Z",
      "updatedAt": "2016-02-09T16:52:44.133Z",
      "id": "56ba157a1424a5aa07d9a342"
    },
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "productType": "56b9d92cd2c1e9d07e64b8f5",
      "name": "Product Attribute1",
      "label": "Product Attribute Label1",
      "attributeType": "text",
      "constraints": "none",
      "isRequired": false,
      "isSearchable": true,
      "createdAt": "2016-02-09T16:46:55.529Z",
      "updatedAt": "2016-02-09T16:46:55.529Z",
      "id": "56ba17ff1424a5aa07d9a343"
    }
  ]
}
```

##ProductAttributes

###Creating new ProductAttribute
```
POST /product_attributes
```
**Example of the API's request:**
```
{
    "name": "Product Attribute",
    "label": "Product Attribute Label",
    "productType":"56b9d92cd2c1e9d07e64b8f5",
    "attributeType": "text"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "productAttribute": {
    "name": "Product Attribute",
    "label": "Product Attribute Label",
    "productType": "56b9d92cd2c1e9d07e64b8f5",
    "attributeType": "text",
    "owner": "56b9d8ffd2c1e9d07e64b8f1",
    "constraints": "none",
    "isRequired": false,
    "isSearchable": true,
    "createdAt": "2016-02-09T16:36:10.430Z",
    "updatedAt": "2016-02-09T16:36:10.430Z",
    "id": "56ba157a1424a5aa07d9a342"
  }
}
```

###DEPRECATED
###Get full list of current user's ProductTypes
#####Answer includes product attributes of user as an owner and which he has rights access
```
GET /product_attributes
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "productAttributes": [
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "productType": "56b9d92cd2c1e9d07e64b8f5",
      "name": "Product Attribute",
      "label": "Product Attribute Label",
      "attributeType": "text",
      "constraints": "none",
      "isRequired": false,
      "isSearchable": true,
      "createdAt": "2016-02-09T16:36:10.430Z",
      "updatedAt": "2016-02-09T16:36:10.430Z",
      "id": "56ba157a1424a5aa07d9a342"
    },
    {
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "productType": "56b9d92cd2c1e9d07e64b8f5",
      "name": "Product Attribute1",
      "label": "Product Attribute Label1",
      "attributeType": "text",
      "constraints": "none",
      "isRequired": false,
      "isSearchable": true,
      "createdAt": "2016-02-09T16:46:55.529Z",
      "updatedAt": "2016-02-09T16:46:55.529Z",
      "id": "56ba17ff1424a5aa07d9a343"
    }
  ]
}
```

###Get one Product Attribute by id
```
GET /product_attributes/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product Attribute was successfully found",
  "productAttribute": {
    "owner": "56b9d8ffd2c1e9d07e64b8f1",
    "productType": "56b9d92cd2c1e9d07e64b8f5",
    "name": "Product Attribute",
    "label": "Product Attribute Label",
    "attributeType": "text",
    "constraints": "none",
    "isRequired": false,
    "isSearchable": true,
    "createdAt": "2016-02-09T16:36:10.430Z",
    "updatedAt": "2016-02-09T16:36:10.430Z",
    "id": "56ba157a1424a5aa07d9a342"
  }
}
```

###Update Product Attribute by id
```
PUT /product_attributes/:id
```
**Example of the API's request:**
```
{
    "name": "Product Attribute3"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully updated",
  "productAttribute": {
    "id": "56ba157a1424a5aa07d9a342",
    "name": "Product Attribute3",
    "createdAt": "2016-02-09T16:36:10.430Z",
    "updatedAt": "2016-02-09T16:52:44.133Z"
  }
}
```

###Delete Product Attribute by id
```
DELETE /product_attributes/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product attribute was removed successfully",
  "productAttribute": [
    {
      "name": "Product Attribute3",
      "label": "Product Attribute Label",
      "productType": "56b9d92cd2c1e9d07e64b8f5",
      "attributeType": "text",
      "owner": "56b9d8ffd2c1e9d07e64b8f1",
      "constraints": "none",
      "isRequired": false,
      "isSearchable": true,
      "createdAt": "2016-02-09T16:36:10.430Z",
      "updatedAt": "2016-02-09T16:52:44.133Z",
      "id": "56ba157a1424a5aa07d9a342"
    }
  ]
}
```


##Variants

###Creating new Variant
```
POST /variants
```
**Example of the API's request:**
```
{
    "product": "56bb3cf2cd1f58942d64b46c",
    "productType": "56bb3bd62d2e92ba1e9551dc"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "variant": {
    "product": "56bb3cf2cd1f58942d64b46c",
    "productType": "56bb3bd62d2e92ba1e9551dc",
    "owner": "56bb2c1684dfb5cf1d49e2c7",
    "isMaster": false,
    "createdAt": "2016-02-10T15:29:25.049Z",
    "updatedAt": "2016-02-10T15:29:25.050Z",
    "id": "56bb575576b2aabd0b0b3e1c"
  }
}
```

###DEPRECATED
###Get full list of current user's Variants
#####Answer includes variants of user as an owner and which he has rights access
```
GET /variants
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "variants": [
    {
      "owner": "56bb2c1684dfb5cf1d49e2c7",
      "productType": "56bb3bd62d2e92ba1e9551dc",
      "product": "56bb3cf2cd1f58942d64b46c",
      "isMaster": true,
      "createdAt": "2016-02-10T13:36:51.042Z",
      "updatedAt": "2016-02-10T13:36:51.042Z",
      "id": "56bb3cf3cd1f58942d64b46d"
    },
    {
      "owner": "56bb2c1684dfb5cf1d49e2c7",
      "productType": "56bb3bd62d2e92ba1e9551dc",
      "product": "56bb3cf2cd1f58942d64b46c",
      "isMaster": false,
      "createdAt": "2016-02-10T15:29:25.049Z",
      "updatedAt": "2016-02-10T15:29:25.050Z",
      "id": "56bb575576b2aabd0b0b3e1c"
    }
  ]
}
```

###DEPRECATED
###Get one Variant by id
```
GET /variants/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Variant was successfully found",
  "variant": {
    "attributes": [],
    "owner": "56bb2c1684dfb5cf1d49e2c7",
    "productType": "56bb3bd62d2e92ba1e9551dc",
    "product": "56bb3cf2cd1f58942d64b46c",
    "isMaster": false,
    "createdAt": "2016-02-10T15:29:25.049Z",
    "updatedAt": "2016-02-10T15:29:25.050Z",
    "id": "56bb575576b2aabd0b0b3e1c"
  }
}
```

###Update Variant by id
```
PUT /variants/:id
```
**Example of the API's request:**
```
{
    "sku": "Hello"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Product was successfully updated",
  "variant": {
    "id": "56bb575576b2aabd0b0b3e1c",
    "createdAt": "2016-02-10T15:29:25.049Z",
    "updatedAt": "2016-02-10T15:48:05.264Z",
    "isMaster": false,
    "productType": {
      "owner": "56bb2c1684dfb5cf1d49e2c7",
      "name": "Sample Product Type",
      "description": "A demo product type",
      "project": "56bb3bd62d2e92ba1e9551db",
      "createdAt": "2016-02-10T13:32:06.717Z",
      "updatedAt": "2016-02-10T13:32:06.717Z",
      "id": "56bb3bd62d2e92ba1e9551dc"
    },
    "sku": "Hello"
  }
}
```

###Delete Variant by id
```
DELETE /variants/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Variant was removed successfully",
  "variant": [
    {
      "product": "56bb3bd62d2e92ba1e9551db",
      "productType": "56bb3bd62d2e92ba1e9551dc",
      "owner": "56bb2c1684dfb5cf1d49e2c7",
      "isMaster": false,
      "createdAt": "2016-02-10T15:29:25.049Z",
      "updatedAt": "2016-02-10T15:48:05.264Z",
      "sku": "Hello",
      "id": "56bb575576b2aabd0b0b3e1c"
    }
  ]
}
```

###DEPRECATED
###Get images by variant
```
GET /variants/:id/images
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "images": [
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "http://45.55.60.139/de719f7b-9a50-464e-bbd8-4cda10e72272.jpg",
      "external": false,
      "createdAt": "2016-02-11T15:29:49.810Z",
      "updatedAt": "2016-02-11T15:29:49.810Z",
      "id": "56bca8eddfcee6d642b0a87c"
    },
    {
      "owner": "56bca31261a92b870f3e2561",
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "https://writeitdown31days.files.wordpress.com/2015/13/hello-picture.gif",
      "external": true,
      "createdAt": "2016-02-11T15:54:18.821Z",
      "updatedAt": "2016-02-11T15:54:18.822Z",
      "id": "56bcaeaaa512b145550febe1"
    }
  ]
}
```

###DEPRECATED
###Get prices by variant
```
GET /variants/:id/prices
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "prices": [
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "owner": "56bca31261a92b870f3e2561",
      "price": 12.12,
      "createdAt": "2016-02-11T18:42:48.671Z",
      "updatedAt": "2016-02-11T18:42:48.671Z",
      "id": "56bcd628b6ef43c946c15f43"
    },
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "owner": "56bca31261a92b870f3e2561",
      "price": 12.13,
      "createdAt": "2016-02-11T18:42:59.281Z",
      "updatedAt": "2016-02-11T18:42:59.281Z",
      "id": "56bcd633b6ef43c946c15f44"
    }
  ]
}
```

##VariantAttributes
###Update Variant Attribute's Value by id
```
PUT /variant_attributes/:id
```
**Example of the API's request:**
```
{
    "value": "New Value"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Variant attribute was successfully updated",
  "attribute": {
    "productAttribute": "56bdc1418fc116c20895dbcc",
    "variant": "56bca47b61a92b870f3e2568",
    "owner": "56bca31261a92b870f3e2561",
    "createdAt": "2016-02-12T11:25:53.253Z",
    "updatedAt": "2016-02-12T11:30:42.201Z",
    "value": "New Value",
    "id": "56bdc1418fc116c20895dbcd"
  }
}
```


##Images
###Creating new Image
```
POST /images
```
**Example of the API's request:**
```
{
    "uri": "https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif",
    "product": "56bca47b61a92b870f3e2567",
    "variant": "56bca47b61a92b870f3e2568"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "image": {
    "uri": "https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif",
    "product": "56bca47b61a92b870f3e2567",
    "variant": "56bca47b61a92b870f3e2568",
    "owner": "56bca31261a92b870f3e2561",
    "external": true,
    "createdAt": "2016-02-11T15:47:14.574Z",
    "updatedAt": "2016-02-11T15:47:14.574Z",
    "id": "56bcad02a512b145550febe0"
  }
}
```

###DEPRECATED
###Get full list of current user's Images
#####Answer includes imagesof user as an owner and which he has rights access
```
GET /images
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "images": [
    {
      "owner": "56bca31261a92b870f3e2561",
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif",
      "external": true,
      "createdAt": "2016-02-11T15:47:14.574Z",
      "updatedAt": "2016-02-11T15:47:14.574Z",
      "id": "56bcad02a512b145550febe0"
    },
    {
      "owner": "56bca31261a92b870f3e2561",
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "https://writeitdown31days.files.wordpress.com/2015/13/hello-picture.gif",
      "external": true,
      "createdAt": "2016-02-11T15:54:18.821Z",
      "updatedAt": "2016-02-11T15:54:18.822Z",
      "id": "56bcaeaaa512b145550febe1"
    }
  ]
}
```

###DEPRECATED
###Get one Image by id
```
GET /images/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Image was successfully found",
  "image": {
    "owner": "56bca31261a92b870f3e2561",
    "product": "56bca47b61a92b870f3e2567",
    "variant": "56bca47b61a92b870f3e2568",
    "uri": "https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif",
    "external": true,
    "createdAt": "2016-02-11T15:47:14.574Z",
    "updatedAt": "2016-02-11T15:47:14.574Z",
    "id": "56bcad02a512b145550febe0"
  }
}
```

###Update Image by id
```
PUT /images/:id
```
**Example of the API's request:**
```
{
    "label": "new image"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Image was successfully updated",
  "image": {
    "owner": {
      "email": "user@mail.com",
      "name": "nikita",
      "createdAt": "2016-02-11T15:04:50.541Z",
      "updatedAt": "2016-02-11T15:04:50.541Z",
      "id": "56bca31261a92b870f3e2561"
    },
    "product": {
      "project": "56bca3dc61a92b870f3e2565",
      "name": "product1",
      "productType": "56bca3dc61a92b870f3e2566",
      "owner": "56bca31261a92b870f3e2561",
      "createdAt": "2016-02-11T15:10:51.013Z",
      "updatedAt": "2016-02-11T15:10:51.013Z",
      "id": "56bca47b61a92b870f3e2567"
    },
    "variant": {
      "productType": "56bca3dc61a92b870f3e2566",
      "owner": "56bca31261a92b870f3e2561",
      "product": "56bca47b61a92b870f3e2567",
      "isMaster": true,
      "createdAt": "2016-02-11T15:10:51.025Z",
      "updatedAt": "2016-02-11T15:10:51.025Z",
      "id": "56bca47b61a92b870f3e2568"
    },
    "uri": "https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif",
    "external": true,
    "createdAt": "2016-02-11T15:47:14.574Z",
    "updatedAt": "2016-02-11T15:59:19.573Z",
    "label": "new image",
    "id": "56bcad02a512b145550febe0"
  }
}
```

###Delete Image by id
```
DELETE /images/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Image was removed successfully",
  "image": [
    {
      "uri": "https://writeitdown31days.files.wordpress.com/2015/12/hello-picture.gif",
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "owner": "56bca31261a92b870f3e2561",
      "external": true,
      "createdAt": "2016-02-11T15:47:14.574Z",
      "updatedAt": "2016-02-11T15:59:19.573Z",
      "label": "new image",
      "id": "56bcad02a512b145550febe0"
    }
  ]
}
```

###Upload Image
**Example of the form for testing file uploading API:**
```
<form action="http://45.55.60.139:1337/images/upload" enctype="multipart/form-data" method="post">
  <input type="text" name="title"><br>
  <input type="file" name="image"><br>
  <input type="submit" value="Upload">
  <input type="submit" value="Upload AJAX" class="js-ajax-upload">
</form>
```

**Example of the API's answer:**
```
{
  "message": "successful",
  "image": {
    "uri": "hello/7717c2b6-2620-4a76-9c09-3f62bfc0dd59.jpg"
  }
}
```

##Prices
###Creating new Price
```
POST /prices
```
**Example of the API's request:**
```
{
    "product": "56bca47b61a92b870f3e2567",
    "variant": "56bca47b61a92b870f3e2568"
}
```

**Example of the API's answer:**
```
{
  "code": "successful",
  "price": {
    "product": "56bca47b61a92b870f3e2567",
    "variant": "56bca47b61a92b870f3e2568",
    "owner": "56bca31261a92b870f3e2561",
    "createdAt": "2016-02-11T18:03:13.563Z",
    "updatedAt": "2016-02-11T18:03:13.563Z",
    "id": "56bccce11382453873aadf73"
  }
}
```

###DEPRECATED
###Get full list of current user's prices
#####Answer includes prices of user as an owner and which he has rights access
```
GET /prices
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "prices": [
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "owner": "56bca31261a92b870f3e2561",
      "uri": "soshace.com/image1.jpg",
      "createdAt": "2016-02-11T18:25:42.358Z",
      "updatedAt": "2016-02-11T18:25:42.358Z",
      "id": "56bcd226d542d6a3252334cb"
    }
  ]
}
```

###DEPRECATED
###Get one Price by id
```
GET /prices/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Price was successfully found",
  "price": {
    "product": "56bca47b61a92b870f3e2567",
    "variant": "56bca47b61a92b870f3e2568",
    "owner": "56bca31261a92b870f3e2561",
    "uri": "soshace.com/image1.jpg",
    "createdAt": "2016-02-11T18:25:42.358Z",
    "updatedAt": "2016-02-11T18:25:42.358Z",
    "id": "56bcd226d542d6a3252334cb"
  }
}
```

###Update Price by id
```
PUT /price/:id
```
**Example of the API's request:**
```
{
    "price": "12.12"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Price was successfully updated",
  "price": {
    "product": {
      "project": "56bca3dc61a92b870f3e2565",
      "name": "product1",
      "productType": "56bca3dc61a92b870f3e2566",
      "owner": "56bca31261a92b870f3e2561",
      "createdAt": "2016-02-11T15:10:51.013Z",
      "updatedAt": "2016-02-11T15:10:51.013Z",
      "id": "56bca47b61a92b870f3e2567"
    },
    "variant": {
      "productType": "56bca3dc61a92b870f3e2566",
      "owner": "56bca31261a92b870f3e2561",
      "product": "56bca47b61a92b870f3e2567",
      "isMaster": true,
      "createdAt": "2016-02-11T15:10:51.025Z",
      "updatedAt": "2016-02-11T15:10:51.025Z",
      "id": "56bca47b61a92b870f3e2568"
    },
    "owner": {
      "email": "user@mail.com",
      "name": "nikita",
      "createdAt": "2016-02-11T15:04:50.541Z",
      "updatedAt": "2016-02-11T15:04:50.541Z",
      "id": "56bca31261a92b870f3e2561"
    },
    "uri": "soshace.com/image1.jpg",
    "createdAt": "2016-02-11T18:25:42.358Z",
    "updatedAt": "2016-02-11T18:34:19.412Z",
    "price": 12.12,
    "id": "56bcd226d542d6a3252334cb"
  }
}
```

###Delete Price by id
```
DELETE /prices/:id
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Price was removed successfully",
  "price": [
    {
      "product": "56bca47b61a92b870f3e2567",
      "variant": "56bca47b61a92b870f3e2568",
      "uri": "soshace.com/image1.jpg",
      "owner": "56bca31261a92b870f3e2561",
      "createdAt": "2016-02-11T18:25:42.358Z",
      "updatedAt": "2016-02-11T18:34:19.412Z",
      "price": 12.12,
      "id": "56bcd226d542d6a3252334cb"
    }
  ]
}
```

##Invitations
```
POST /invitations/
```
**Example of the API's request:**
```
{
    "email": "user@mail.com",
    "team": "56bca31261a92b870f3e2563"
}
```
**Examples of the API's answer:**
```
{
  "code": "invitation.sent",
  "message": "Invitation was sent"
}
```
```
{
  "code": "user.added.to.team",
  "message": "user was added to team",
  "team": {
    "members": [
      {
        "email": "user@mail.com",
        "name": "nikita",
        "createdAt": "2016-02-11T15:04:50.541Z",
        "updatedAt": "2016-02-12T14:55:32.086Z",
        "teams": "56bca31261a92b870f3e2563",
        "id": "56bca31261a92b870f3e2561"
      },
      {
        "name": "Nikita",
        "email": "user1@mail.ru",
        "createdAt": "2016-02-13T10:13:44.370Z",
        "updatedAt": "2016-02-13T10:50:45.904Z",
        "teams": "56bca31261a92b870f3e2563",
        "id": "56bf01d89d75f27f5a65c1a9"
      },
      {
        "name": "Nikita",
        "email": "user2@mail.ru",
        "createdAt": "2016-02-13T10:21:51.028Z",
        "updatedAt": "2016-02-13T10:21:51.153Z",
        "teams": "56bca31261a92b870f3e2563",
        "id": "56bf03bfa169642a190500aa"
      }
    ],
    "permissions": [],
    "company": {
      "name": "nikita's Company",
      "owner": "56bca31261a92b870f3e2561",
      "createdAt": "2016-02-11T15:04:50.601Z",
      "updatedAt": "2016-02-11T15:04:50.601Z",
      "id": "56bca31261a92b870f3e2562"
    },
    "owner": {
      "email": "user@mail.com",
      "name": "nikita",
      "createdAt": "2016-02-11T15:04:50.541Z",
      "updatedAt": "2016-02-12T14:55:32.086Z",
      "teams": "56bca31261a92b870f3e2563",
      "id": "56bca31261a92b870f3e2561"
    },
    "name": "Admin",
    "createdAt": "2016-02-11T15:04:50.619Z",
    "updatedAt": "2016-02-13T10:50:45.893Z",
    "id": "56bca31261a92b870f3e2563"
  }
}
```

##Permissions

###DEPRECATED
###Get full list of current user's permissions
#####Answer includes permissions of user as an owner and which he has rights access
```
GET /permissions
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "permissions": [
    {
      "project": "56bf26dda7d22db31f282771",
      "team": "56bf2e0070e8b19272eaa385",
      "owner": "56bca31261a92b870f3e2561",
      "productsPermission": "none",
      "ordersPermission": "none",
      "customersPermission": "none",
      "createdAt": "2016-02-13T13:22:08.435Z",
      "updatedAt": "2016-02-13T13:22:08.435Z",
      "id": "56bf2e0070e8b19272eaa386"
    },
    {
      "project": "56bf272bf428323e3cbabf4d",
      "team": "56bf2e0070e8b19272eaa385",
      "owner": "56bca31261a92b870f3e2561",
      "productsPermission": "none",
      "ordersPermission": "none",
      "customersPermission": "none",
      "createdAt": "2016-02-13T13:22:08.439Z",
      "updatedAt": "2016-02-13T13:22:08.439Z",
      "id": "56bf2e0070e8b19272eaa387"
    }
  ]
}
```

###Update Permission by id
```
PUT /permissions/:id
```
**Example of the API's request:**
```
{
    "productsPermission": "manage",
    "ordersPermission": "view",
    "customersPermission": "view"
}
```
**Example of the API's answer:**
```
{
  "code": "successful",
  "message": "Permission was successfully updated",
  "permission": {
    "project": "56bf26dda7d22db31f282771",
    "team": "56bf2e0070e8b19272eaa385",
    "owner": "56bca31261a92b870f3e2561",
    "productsPermission": "manage",
    "ordersPermission": "view",
    "customersPermission": "view",
    "createdAt": "2016-02-13T13:22:08.435Z",
    "updatedAt": "2016-02-13T13:31:56.263Z",
    "id": "56bf2e0070e8b19272eaa386"
  }
}
```

###Get Countries by locale
```
GET /countries/:locale
```

**Example of the API's answer:**
```
{
  "code": "success",
  "countries": [
    {
      "isoCode": "AF",
      "name": "Afghanistan"
    },
    {
      "isoCode": "AL",
      "name": "Albania"
    },
    {
      "isoCode": "DZ",
      "name": "Algeria"
    },
    {
      "isoCode": "AS",
      "name": "American Samoa"
    },
   ...
  ]
}
```


###Get Languages by locale
```
GET /languages/:locale
```

**Example of the API's answer:**
```
{
  "code": "success",
  "countries": [
    {
      "isoCode": "ab",
      "name": "Abkhazian"
    },
    {
      "isoCode": "aa",
      "name": "Afar"
    },
    {
      "isoCode": "af",
      "name": "Afrikaans"
    },
    {
      "isoCode": "ak",
      "name": "Akan"
    },
    {
      "isoCode": "sq",
      "name": "Albanian"
    },
    {
      "isoCode": "sq-AL",
      "name": "Albanian (Albania)"
    },
    {
      "isoCode": "am",
      "name": "Amharic"
    },
    ...
  ]
}
```


###Get Currencies by locale
```
GET /currencies/:locale
```

**Example of the API's answer:**
```
{
  "code": "success",
  "countries": [
    {
      "isoCode": "ab",
      "name": "Abkhazian"
    },
    {
      "isoCode": "aa",
      "name": "Afar"
    },
    {
      "isoCode": "af",
      "name": "Afrikaans"
    },
    {
      "isoCode": "ak",
      "name": "Akan"
    },
    {
      "isoCode": "sq",
      "name": "Albanian"
    },
    {
      "isoCode": "sq-AL",
      "name": "Albanian (Albania)"
    },
    {
      "isoCode": "am",
      "name": "Amharic"
    },
    ...
  ]
}
```


##Customers

###Create Customers
```
POST /customers
```
**Example of the API's request:**
```
{
    "name": "Nikita",
    "password": "123qwe123",
    "email": "user@mail.ru"
}
```

**Example of the API's answer:**
```
{
  "url": "http://45.55.60.139:1337/customers/verify/user@mail.ru?code=gitCRIY6EWluU024dwjJXMhVRIhghRAh"
}
```


###Verify Customers
```
GET /customers/verify/:email
```

```
   http://45.55.60.139:1337/customers/verify/user@mail.ru?code=gitCRIY6EWluU024dwjJXMhVRIhghRAh
```

**Example of the API's answer:**
```
{
  "verified": true,
  "email": "user@mail.ru"
}
```


##Token

###Create Token

**Example of the API's request:**
```
POST /oauth/token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=password&username=user@mail.ru&password=A3ddj3w&client_id&client_secret=$2a$10$YhP2Ri5oMj8IHIlthhWIM..BqfoxppACJwaxEKuHcQAywdutC9YPG
```

**Example of the API's answer:**
```
{
  "token_type": "bearer",
  "access_token": "7d4e0c261ee17d5c8bbc3d793f84867343c76cea",
  "expires_in": 3600
}
```
 We are looking forward to meeting you on our website *https://soshace.com*
