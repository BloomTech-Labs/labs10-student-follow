# [Refreshr App](https://refreshr-app.netlify.com) (Lambda School Labs 10)

![Refreshr Logo](./logo.png "Refresh your mind")

- [App Home](https://refreshr-app.netlify.com)

---

## Contributors

- **Chaya Otikor** | [Github](https://github.com/cotikor)

- **Justin Lowry** | [Github](https://github.com/dividedsky)

- **Nick O'Ferrall** | [Github](https://github.com/nickoferrall) | [LinkedIn](https://www.linkedin.com/in/nickoferrall/)

- **Sawyer Zincone** | [Github](https://github.com/szincone) | [LinkedIn](https://www.linkedin.com/in/szincone/)

- **Timothy Hoang** | [Github](https://github.com/timh1203) | [LinkedIn](https://www.linkedin.com/in/timothyhoang/)

---

## Project Overview

```
"Learning is difficult. Teaching is hard. When learners have small triggers to remember content over a spread out period of time they retain more. Send customizable quizzes on scheduled intervals of 2 days, 2 weeks and 2 months after the initial lecture."
```

- `Refreshr` aims to help students retain information through the spaced-learning method and periodic, scheduled quizzes called "refreshrs". This project was designed for our Lambda School Labs Capstone Project.

### Key Features

```md
- Create a class and manage students in the class
- Create and edit Refreshrs
- A Refreshr should have a 2 day, 2 week, and 2 month review
- A Refreshr review item should have text and a multiple choice question
- Assign a Refreshr to a class with a lecture time to automate the delivery of quizzes
- The Refreshr s should be automatically delivered via email
- A teacher should be able to see the participation rate in dashboard
```

---

## Tech Stack

### Frontend

```md
# React (JavaScript Library)

- React features reusable components, fast rendering with the virtual DOM, great ecosystem with plugins, and state-management in the component
```

```md
# React Hooks (Library Feature)

- React Hooks a new stable feature as of the v16.8 release and features the ability of functional components to have state and various life-cycle methods
```

```md
# Material-UI Library (Styling Library)

- MUI features a professional UI, lends credibility due to having a similar look to other google sites, and prevent global CSS leaks
```

### Backend

```md
# NodeJS

- NodeJS features V8 JavaScript engine (particularly well suited to live updated) and has a robust NodeJS ecosystem

# ExpressJS

- ExpressJS is a library built to smooth out operations on top of the NodeJS language
```

```md
# PostgreSQL (Database)

- PostgreSQL is a production grade database, blends well w/ deployment technology, and widely used (2nd most popular db package on npm, good documentation, good support)
```

#### Data Model

![Data Model](./dataModel.png "Refreshr Data Model")

### Deployment

```md
# Netlify

- Features complete services for deployment including automated deployment, continuous integration, HTTPS secured with free TLS certificate
- Multi-cloud infrastructure designed for speed, automated to scale, and intrinsically secure
- Tool-agnostic platform allows for freedom of addons and tools
- Has dynamic functionality with built-in applications like HTML forms
```

```md
# Heroku

- Well-known service, reliable support, and well-documented
- Works with many backend languages: NodeJS, Ruby, PHP, Python, and others
- Features rich system of third party addons and open-sourced buildpacks
- Simple to scale horizontally or vertically
```

### API/Services

```md
# Sendgrid
- Sendgrid is an email service, part of the Twilio company, which gives developers access to the Sendgrid V3 API to control email campaigns, set lists, set senders, set recipients, and many other features.
- Our purposes with Refreshr is to use it to schedule refreshrs and to email students out with a magic link back to our platform in order to take their refreshr.
- The five specific operation types involved are campaigns, list, list recipients, senders, and recipients.
- More information on [Sendgrid V3 documentation](https://sendgrid.api-docs.io/v3.0)
```

```
# Other APIs
- Auth0 - authorization and authentication service
- Stripe - payment portal service
- Axios - Promise based HTTP client for the browser and node.js
- SendGrid - Email service
- Papaparse - CSV parser package
- Knex - SQL Query Builder for Javascript
- Material-UI - UI Design library
- Jest/React-Testing-Library/Jest-Dom - Testing libraries
- Supertest - Testing library
- Dotenv - load local environment variables for env
- Cors - Cross Origin Bridge
- Faker - Simulates fake data
```

---

## Environment Variables

```md
SENDGRID_API_KEY=Official Key from API (Source: https://app.sendgrid.com/settings/api_keys)
```

---

## Testing

```md
# Jest

# Jest-Dom

# React Testing Library

- React Testing Library is a simple and complete React DOM testing utilities that encourage good testing practices
- The guiding principle: The more your tests resemble the way your software is used, the more confidence [the tests] can give you
- This tool was designed to work alongside Jest and Mocha, not to replace them
- React Testing Library is less opinionated than Enzyme and makes the testing process more developer-friendly, this library can also replace Enzyme
- Write tests for React components that avoid including implementation details
- Maintain your tests so it won't break tests or slow down the team even with code refactoring when making changes to implementation but not functionality
```

---

## Contributions/Issues/Bugs

### Would you like to report an issue/bug?

- Please post to the [issues section](https://github.com/Lambda-School-Labs/labs10-student-follow/issues) on our github repo as it helps us track of all tasks, enhancements, and bugs for the project!
- Some guidelines can be found in this [document](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md#bugs).

```md
# How do you use the issues section?

- By using `@mentions` and references inside of issues, you can notify other GitHub users & teams, and even cross-connect issues to each other.
- `Title` and `Description` - decribes what the issue is all about
- `Labels` - helps categorize and filter issues
- `Milestone` - acts as a container for issues like Beta Launch, October Sprint, or Redesign
- `Assignee` - developer responsible for working on the issue
- `Comments` - allows anyone with access to the repository to provide feedback
```

### Would you like to contribute to the repository?

- In short, please ask first before embarking on any significant pull request
- Good pull requests - patches, improvements, new features - are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.
- Please follow the guidelines set out by this [document](https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md#pull-requests).

#### Source: https://guides.github.com/features/issues/

---

## Additional Documentation

```md
- For the backend documentation, please visit [Backend Documentation]().
```
