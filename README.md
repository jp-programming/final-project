# Heroku APP
Click the following links to use the Heroku app:
* [Home](https://jp-nodejs.herokuapp.com/app)
* [Login](https://jp-nodejs.herokuapp.com/app/login)
* [Register](https://jp-nodejs.herokuapp.com/app/register)
* [Info](https://jp-nodejs.herokuapp.com/info)
* [Random Numbers](https://jp-nodejs.herokuapp.com/api/randoms)

# Start local app command

To run server with node on mode fork or cluster:
```
$ node server.js -p [PORT] --mode [FORK || CLUSTER]
```

# Test command

This command bash runs products API test and creates a report of output.
```
$ npx mocha -R spec products.test.js | tee ./reports/products-test_report
```

# GraphQL
This link allows you to test graphQL queries on GraphiQL IDE
https://jp-nodejs.herokuapp.com/graphql