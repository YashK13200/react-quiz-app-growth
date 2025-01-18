# Quiz Land - A Quiz Web Application 

# Description :
https://github.com/user-attachments/assets/3c16ed24-6fa0-4f0a-8762-2af9fc6068f1


## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/YashK13200/react-quiz-app-growth.git
cd react-quizland
```

Install dependencies:
 ```bash
   npm install
   ```

Start the frontend development server:
 ```bash
 npm run dev
   ```
This will start the frontend on http://localhost:5171.


 A quiz application that meets the criteria detailed below. build it using React.js and Tailwind CSS

# 1. Quiz Layout & Flow:

The application have a start page where the user submit their email address.

Then the application display 15 questions to the user.

A timer is displayed on the top of the page, counting down from 30 minutes. The quiz auto-submit when the timer reaches zero.

# 2. Navigation:

Users are able to navigate to a specific question.

An overview panel Which show all questions indicating:

Which questions the user has visited.

Which questions have been attempted.

# 3. End of Quiz:

After the quiz or when the timer ends, users are directed to a report page.

This report display each question with the user's answer and the correct answer side by side or in a format that is easy to compare.

# 4. Data Source:

   ```bash
Fetching the quiz questions from
https://opentdb.com/api.php?amount=15 API.
```
From this API we use the question parameter as the question to be displayed.

Choices to be shown to the user for each question is a concatenated array of correct_answer and incorrect_answers parameters.

Correct answer for every question is provided in correct_answer parameter.

The application is adapted to different device sizes and is compatible with the latest versions
of major browsers (e.g., Chrome, Firefox, Safari, and Edge).

Added smooth transitions or animations when navigating between questions.

```bash
Made With ❤️ and Patience !
```
