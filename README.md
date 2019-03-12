# [Refreshr App Backend](https://refreshr.herokuapp.com) (Lambda School Labs 10)

![Refreshr Logo](./client/src/logo.png "Refresh your mind")

- [App Client Home](https://refreshr-app.netlify.com)
- [Backend Base URL](https://refreshr.herokuapp.com/)

---

## Additional Documentation

- For more info about the app, please visit [Frontend Documentation](https://github.com/Lambda-School-Labs/labs10-student-follow/blob/master/client/README.md).

---

## Contributors

- **Chaya Otikor** | [Github](https://github.com/cotikor)

- **Justin Lowry** | [Github](https://github.com/dividedsky) | [LinkedIn](https://www.linkedin.com/in/justin-lowry-792960180/)

- **Nick O'Ferrall** | [Github](https://github.com/nickoferrall) | [LinkedIn](https://www.linkedin.com/in/nickoferrall/)

- **Sawyer Zincone** | [Github](https://github.com/szincone) | [LinkedIn](https://www.linkedin.com/in/szincone/)

- **Timothy Hoang** | [Github](https://github.com/timh1203) | [LinkedIn](https://www.linkedin.com/in/timothyhoang/)

---

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

