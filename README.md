# Movie Database

This project populates MySQL and MongoDB databases with movie data from an Excel file.

## Project Structure

The project is divided into two main directories: `node-mongo` and `node-mysql`. Each directory contains the necessary files to connect to and interact with the respective databases.

## Getting Started

### Prerequisites

- Node.js
- Docker
- MongoDB
- MySQL

### Installation

1. Clone the repository
2. Install the dependencies by running `npm install` in the root directory

## Usage

There are two scripts defined in the `package.json` file to populate the databases:

- `populate:mysql`: Populates the MySQL database
- `populate:mongo`: Populates the MongoDB database

You can run these scripts using npm. For example, to populate the MongoDB database, run:

```sh
npm run populate:mongo

```markdown
# Movie Database Population

This project populates MySQL and MongoDB databases with movie data from an Excel file.

## Project Structure

The project is divided into two main directories: `node-mongo` and `node-mysql`. Each directory contains the necessary files to connect to and interact with the respective databases.

## Getting Started

### Prerequisites

- Node.js
- Docker
- MongoDB
- MySQL

### Installation

1. Clone the repository
2. Install the dependencies by running `npm install` in the root directory

## Usage

There are two scripts defined in the `package.json` file to populate the databases:

- `populate:mysql`: Populates the MySQL database
- `populate:mongo`: Populates the MongoDB database

You can run these scripts using npm. For example, to populate the MongoDB database, run:

```sh
npm run populate:mongo
```

## Docker

Dockerfiles are provided for both MongoDB and MySQL. To build and run the Docker containers, use the following commands:

For Both:


```sh
docker-compose build
docker-compose up

```

For MongoDB:

```sh
docker build -f Dockerfile.mongo -t movie-database-mongo .
docker run -p 27017:27017 movie-database-mongo
```

For MySQL:

```sh
docker build -f Dockerfile.mysql -t movie-database-mysql .
docker run -p 3306:3306 movie-database-mysql
```

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details
```


