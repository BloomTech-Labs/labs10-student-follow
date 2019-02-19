## Refreshr Backend

```
"Learning is difficult. Teaching is hard. When learners have small triggers to remember content over a spread out period of time they retain more. Send customizable quizzes on scheduled intervals of 2 days, 2 weeks and 2 months after the initial lecture."
```
- `Refreshr` aims to help students retain information through the spaced-learning method and periodic, scheduled quizzes called "refreshrs". This project was designed for our Lambda School Labs Capstone Project.

# [Refreshr App](https://refreshr-app.netlify.com) (Lambda School Labs 10)

![Refreshr Logo](./client/logo.png "Refresh your mind")

- [App Home](https://refreshr-app.netlify.com)

## Base URL: https://refreshr.herokuapp.com/

## Endpoints
### Teachers
* GET /teachers
  * returns a list of all teachers

---
* GET /teachers/id
  * returns one teacher by id

---
* PUT /teachers/id
  * updates one teacher by id

---
* DELETE /teachers/id
  * delete teacher by id

---
* _missing:_ POST

### Students
* GET /students
  * returns a list of all students

---
* GET /students/id
  * returns one student by id

---
* POST /students
  * adds a student

---
* PUT /students/id
  * updates one student by id

---
* DELETE /students/id
  * deletes student by id

---
### Classes
* GET /classes
  * returns a list of all classes

---
* GET /classes/id
  * returns one class by id

---
* POST /classes
  * adds a class

---
* PUT /classes/id
  * updates one class by id

---
* DELETE /classes/id
  * deletes class by id

### Refreshrs
* GET /refreshrs
  * returns a list of all refreshrs

---
* GET /refreshrs/id
  * returns refreshr by id

---
* POST /refreshrs
  * adds a refreshr

---
* PUT /refreshrs/id
  * update refreshr by id

---
* DELETE /refreshrs/id
  * delete refreshr by id

---
### Questions
* GET /questions
  * returns all questions

---
* GET /questions/id
  * returns questions by id

---
* POST /questions
  * adds a question

---
* PUT /questions/id
  * update question by id

---
* DELETE /questions/id
  * delete question by id

---
### Billing
* POST /billing/charge
  * Gives us your money.

---
## Contributions/Issues/Bugs

## Additional Documentation

- For the frontend documentation, please visit [Frontend Documentation]().

## Contributors

- **Chaya Otikor** | [Github](https://github.com/cotikor)

- **Justin Lowry** | [Github](https://github.com/dividedsky)

- **Nick O'Ferrall** | [Github](https://github.com/nickoferrall) | [LinkedIn](https://www.linkedin.com/in/nickoferrall/)

- **Sawyer Zincone** | [Github](https://github.com/szincone) | [LinkedIn](https://www.linkedin.com/in/szincone/)

- **Timothy Hoang** | [Github](https://github.com/timh1203) | [LinkedIn](https://www.linkedin.com/in/timothyhoang/)
