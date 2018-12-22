# Snowroom

A mock showroom app for consumers to peruse and purchase different colorways of a snowboard. 
All development (as well as a minimal UX/UI design and logos) was done by the creator, Johnny Povolny, 
as sample code to demonstrate expertise in the latest front-end technologies for prospective clients 
and employers. 


### Demo

Access the live demo at: http://snowroom.codebravo.tech

### Stack

* Snowroom is written in ES6-style ReactJS and follows the Redux application architecture. 
* 3D models are displayed using a WebGL-specific build of the Unity 3D gaming engine. 
* Redux First Router is used for Redux-esque URL management- transforming routes into states and allowing 
the site to function in a SPA-like fashion.
* Javascript bundle is built using Webpack
* Style sheets are written in SASS, and the webpack employs the Autoprefixer plugin for Postcss-Loader to auto-generate CSS vendor prefixes. (see [webpack config](https://github.com/johnnypovolny/snowroom/blob/master/webpack.config.js) and [postcss config](https://github.com/johnnypovolny/snowroom/blob/master/postcss.config.js)) The project also contains
an example of a style sheet written in the Glamorous CSS-as-JS syntax, in order to allow one of the components to adjust its styling in reaction to a change in the app state passed as props to the style sheet
 (see [UnityMaster component](https://github.com/johnnypovolny/snowroom/blob/master/src/components/UnityMaster/UnityMaster.style.js))
* Static site is hosted in Amazon Web Services S3. All AWS Resources (S3 bucket, Route 53 alias, etc) are created and managed using Serverless (see [serverless.yaml](https://github.com/johnnypovolny/snowroom/blob/master/serverless.yaml)). Serverless is also used for the automatic 
deployment of the static assets (index.html, bundle.js, images/fonts, etc) via the serverless-s3-sync plugin.
* The primary development environment was Google Chrome, but the app is compatible with all browsers that support an 
up to date version of WebGL. Mobile devices are not currently supported (since Unity/WebGL support in mobile browsers 
is not up to date).

### Licensing Note:
As this project is sample code to exemplify the owner's personal skill set, no open source license is being offered. 
No use or distribution by external parties is permitted.  
 