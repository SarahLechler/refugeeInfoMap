# Refugee Info Map

This is an interactive map for refugees to look up institutions in their city. Moreover, users can create a log-in to contribute
to this map and add institutions and information about that institutions. All options can be configured with a config-File.

### Version
1.0.0

### Installation

Refugee Info Map requires [Node.js](https://nodejs.org/) v4+ to run.

###### Configuration Propertied
 | Property                       | Type     | Possible Values               | Default            | Description                          |
 |--------------------------------|----------|-------------------------------|--------------------|--------------------------------------|
 | routing                        | Boolean  |```true``` &#124; ```false```  |                    | Rounting added to the app            |
 | logIn                          | Boolean  |```true``` &#124; ```false```  |                    | LogIn required                       |
 | contribution                   | Boolean  |```true``` &#124; ```false```  |                    | Contribution allowed                 |
 | credential.Name                | String   |                               |                    | Name of provider contact             |
 | credential.Mail                | String   |                               |                    | Mail of provider contact             |
 | specifyEntriesToLocation       | Boolean  |```true``` &#124; ```false```  |                    | Specify to one location?             |
 | boundingBox                    | Array    |                               |                    | Array of Coordinates                 |

```sh
$ npm install
```

```sh
$ npm start
```