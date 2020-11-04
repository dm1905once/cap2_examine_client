## Examine



### Description

Examine is an online exam platform that enables organizations (e.g. universities, etc.) to post exams online. Potential students would then acquire the right to take the exams and results would be stored in the platform.



Access is split by profile, depending on what side of the application process is accessing: organizations or applicants.



#### Access as Educational Organizations

College admission officers (i.e. "examiners") can subscribe to **Examine** and create, edit or delete exams. Every exam would have multiple questions. Currently, the only types of questions allowed are: *multiple-choice* or *binary* (i.e. true/false) questions. (In the future more complex question types can be developed; see Todo section). The examiner would also especify what would be the correct answer for each question so that the exam can be evaluated automatically by the tool.

Once an exam is created, with it is made public and visible to potential applicants that register.



#### Access as Applicant

Potential applicants can register and acquire the right to take exams that have been made available by educational organizations. Once acquired, applicants would go through each exam question and eventually submittion the exam for evaluation. They would see the outcome in a few seconds after submitting the exam.



### Website structure
```tex
-Home
|-Access as Applicant
 |_Login
 |_Register
  |_Available Exams
    |_Take Exam
     |_Submit Exam
  |_Completed Exams
  |_Browse Exams
    |_Buy Exam
     |_(Stripe Payment integration)
|-Access as Educational Organization
 |_Login
 |_Register
   |_Create a new Exam
     |_Add questions
       |_Submit Exams
   |_Your Exams
     |_Edit Exam
     |_Delete Exam
```




### Technologies used

1. NodeJs/Express, 
2. React/Redux,
3. PostgreSQL, 
4. Prisma, 
5. Heroku, 
6. Integration with Stripe Payment,
7. RESTful APIs, 
8. JavaScript, 
9. HTML, 
10. Semantic UI



### How to run

1. Clone or download from Github

2. Install the required libraries from the requirements.txt file: `npm install` 

3. Create a local postgres database named 'examine_test': `psql; create database examine_test; \q`

4. Generate the DB schema and basic seed data found in `db_dump.sql`

5. Create the following environment variables:

  5.1 `LOCALHOST` with the *client*  URL and port 
  5.2 `SECRET_KEY` with the server app secret key
  5.3 `STRIPE_SECRET` That you can get through Stripe https://dashboard.stripe.com/register 
  5.4 `PORT` with the *server* port



### Demo access

*TBD*

  
