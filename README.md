# Book-Manager-App

## Overview
The Book Manager App is designed to facilitate the issuance and return of books, manage user transactions, and generate reports on book rentals.

## Features
- Issue and return books
- Track users who have issued books
- Calculate rental fees based on issue and return dates
- Generate reports on book issuance and rental income

## Database Structure
### Collections
1. **Users**
   - **userId**: Unique identifier for the user
   - **name**: Name of the user
   - **email**: User's email address

2. **Books**
   - **bookId**: Unique identifier for the book
   - **book_name**: Name of the book
   - **category**: Genre or category of the book
   - **rentPerDay**: Rental price per day for the book

3. **Transactions**
   - **transactionId**: Unique identifier for the transaction
   - **book_id**: Reference to the book issued
   - **user_id**: Reference to the user who issued the book
   - **issueDate**: Date when the book was issued
   - **returnDate**: Date when the book was returned
   - **totalRent**: Total rental fee calculated for the transaction

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Harsh-1105/Book-Manager-App.git
   cd book-manager-app
2. Install the dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory with the following variables:
   ```bash
   PORT=4000
   MongoDBURL=<your_mongodb_connection_string>
4. Start the Server
   ```bash
   npm start

## API Endpoints

### Books API

#### Search Books by Name
- **Input:** Book name or term in the name
- **Output:** List of all books matching the name or term
- **Endpoint:** 
  ```http
  GET /books/search?name={book_name}
![SearchFilterByName](https://github.com/user-attachments/assets/9238584c-ed6e-485f-8795-3b9f96e7ea84)
  
#### Filter Books by Rent Price Range
- **Input:** Rent price range (min and max)
- **Output:** List of books within the specified rent range
- **Endpoint:** 
  ```http
  GET /books/filter?minRent={min}&maxRent={max}
![searchBookByRange](https://github.com/user-attachments/assets/067984e6-acc6-4991-850a-46d6d04a96fd)

#### Filter Books by Category, Name/Term, and Rent per Day
- **Input:** Category, name/term, and rent per day range
- **Output:** List of books matching the criteria
- **Endpoint:** 
  ```http
  GET /books/filter?category={category}&name={book_name}&minRent={min}&maxRent={max}
![SearchBookByAllThreeValues](https://github.com/user-attachments/assets/38a48fe3-b474-4494-b2d6-de60ffbbf93f)
#### Transactions-> Issue Book
- **Input:** Book name, user name/userId, issue date
- **Output:** Update the transaction DB with these values
- **Endpoint:** 
  ```http
  POST /transactions/issueBook
![IssueBook](https://github.com/user-attachments/assets/390ef3d0-b91d-432c-a3a2-dc60bc7158e4)

#### Transactions->  Return Book
- **Input:** Book name, user name/userId, return date
- **Output:** Calculate rent based on issue date and return date, update the transaction DB
- **Endpoint:** 
  ```http
  POST /transactions/returnBook
![Return Book](https://github.com/user-attachments/assets/c24f0f63-5991-4447-886c-20360ab5b2dc)

#### Other Screenshots

![getAllBooks](https://github.com/user-attachments/assets/5c1b65d2-2cab-429a-8a63-92cca0b369b2)
![Add User](https://github.com/user-attachments/assets/19152803-d0d7-4554-b5a6-ca879cd4a30d)
![Add Book](https://github.com/user-attachments/assets/a97f6df4-3b5c-44d7-8911-e1de186c3b85)
![getAllUsers](https://github.com/user-attachments/assets/e5403871-cb7e-4cd5-92fe-5aa5cd0a17f6)

## References
- [Node.js Official Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/en/starter/installing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Moment.js Documentation](https://momentjs.com/docs/)
- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- [MongoDB Range](https://www.mongodb.com/docs/atlas/atlas-search/range/)
- [MongoDB Regex](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)

## Outro
Thank you for checking out the Book Manager App! This application is a work in progress, and I welcome any feedback, suggestions, or contributions. Feel free to open issues or submit pull requests to help improve the project. 

-Harsh Kumar Sharma(HKS)
Happy coding!



