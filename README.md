# JSON Data Store

This server allows you to create, read, update, and delete JSON data
in a persistent document database.

The backend [node](https://nodejs.org) service runs an
[Express](https://expressjs.com) web framework to make available the API engine.
All data is persistently stored in [MongoDB](https://mongodb.com).

The server HTTP responses mainly conform to
[RFC7231](https://www.rfc-editor.org/rfc/rfc7231#section-4.3).

## Purpose

The server is a specialized type of object store that is meant for aiding
in the testing and development of frontend applications interacting with
RESTful APIs.


# Initialization

Install the `npm` packages required by the server:

```
$ cd server
$ npm install
```

The various services (node, mongo, mongo express) may be initialized with the
following command:

```
$ docker-compose up
```

By default, the server will be up and running at `http://localhost:3000`.


## Configuration

You can change the default port (3000) to whatever suits you by copying the
`env-template` file to `.env`, and modifying the `SERVER_PORT` variable.

Configuration settings are read upon initialization, so ensure the services are
restarted after modifying the environment.


# Interacting with Data

## Curl

Various scripts are for creating, reading, updating, and deleting data.

### POST

Add new data to specified `resource`.

```
$ ./post <resource> '<data>'
```

e.g. `post users '{ "username": "john" }'`

### GET

Retrieve data from a specified `resource`, optionally with given `id`.

```
$ ./get <resource> [<id>]
```

e.g. `get users` or `get users 638e47db`

### DELETE

Delete all data given a `resource`, or with a specific `id`.

```
$ ./delete <resource> [<id>]
```

e.g. `delete users` or `delete users 638e47db`

### PATCH

Partially update existing data at a given `resource` and `id`.

```
$ ./patch <resource> <id> '<data>'
```

e.g. `patch users 638e47db '{ "password": "foobar" }'`

### PUT

Replace data at a given `resource` and `id`.

```
$ ./put <resource> <id> '<data>'
```

e.g. `put users 638e47db '{ "username": "alicia", "password": "foobar" }'`


## Mongo Express

You can administer the data using a browser at `http://localhost:8081`.
