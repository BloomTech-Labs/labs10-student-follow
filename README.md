# [Refreshr App](https://refreshr-app.netlify.com) (Lambda School Labs 10)

![Refreshr Logo](./logo.png "Refresh your mind")

- [App Home](https://refreshr-app.netlify.com)

## Contributors

- **Chaya Otikor** | [Github](https://github.com/cotikor)

- **Justin Lowry** | [Github](https://github.com/dividedsky)

- **Nick O'Ferrall** | [Github](https://github.com/nickoferrall) | [LinkedIn](https://www.linkedin.com/in/nickoferrall/)

- **Sawyer Zincone** | [Github](https://github.com/szincone) | [LinkedIn](https://www.linkedin.com/in/szincone/)

- **Timothy Hoang** | [Github](https://github.com/timh1203) | [LinkedIn](https://www.linkedin.com/in/timothyhoang/)

## Project Overview

```
"Learning is difficult. Teaching is hard. When learners have small triggers to remember content over a spread out period of time they retain more. Send customizable quizzes on scheduled intervals of 2 days, 2 weeks and 2 months after the initial lecture."
```

- `Refreshr` aims to help students retain information through the spaced-learning method and periodic, scheduled quizzes called "refreshrs". This project was designed for our Lambda School Labs Capstone Project.

### Key Features

```
- Create a class and manage students in the class
- Create and edit Refreshrs
- A Refreshr should have a 2 day, 2 week, and 2 month review
- A Refreshr review item should have text and a multiple choice question
- Assign a Refreshr to a class with a lecture time to automate the delivery of quizzes
- The Refreshr s should be automatically delivered via email
- A teacher should be able to see the participation rate in dashboard
```

## Tech Stack

## Frontend

### React (JavaScript Library)

- React features reusable components, fast rendering with the virtual DOM, great ecosystem with plugins, and state-management in the component
- Drawbacks: React is slower than some frameworks, batteries not "included", and lots of boilerplate

```

```

### React Hooks (Library Feature)

- React Hooks a new stable feature as of the v16.8 release and features the ability of functional components to have state and various life-cycle methods
- Drawbacks: Testing with certain libraries are not established

```

```

### Material-UI Library (Styling Library)

- MUI features a professional UI, lends credibility due to having a similar look to other google sites, and prevent global CSS leaks
- Drawbacks: MUI will produce designs similar to other sites

```

```

## Backend

### NodeJS, ExpressJS (Framework/Library)

- NodeJS features V8 JavaScript engine (particularly well suited to live updated) and has a robust NodeJS ecosystem
- Drawbacks: NodeJS’s API changes frequently, existing codebases might needs updates, and
  If intensive CPU was required, NodeJS’s single thread approach wouldn’t be effective

```

```

### PostgreSQL (Database)

- PostgreSQL is a production grade database, blends well w/ deployment technology, and widely used (2nd most popular db package on npm, good documentation, good support)
- Drawbacks: Set-up more involved than NoSQL

```

```

### Data Model

![Data Model](./dataModel.png "Refreshr Data Model")

## Deployment

### Netlify and Heroku

- Well-known services, reliable support, and well-documented
- Drawbacks: Data is hosted off-site

```

```

## API/Services

- Auth0 - authorization and authentication service
- Stripe - payment portal service
- Axios - Promise based HTTP client for the browser and node.js
- SendGrid - Email service
- Papaparse - CSV parser package
- Jest - Testing library
- Knex - SQL Query Builder for Javascript
- Material-UI - UI Design library
- Supertest - Testing library
- Enzyme - JavaScript Testing utilities for React
- Dotenv - load local environment variables for env
- Cors - Cross Origin Bridge
- Faker - Simulates fake data

## Environment Variables

```

```

## Testing

## Contributions/Issues/Bugs

## Additional Documentation

- For the backend documentation, please visit [Backend Documentation]().