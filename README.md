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

#### Filter Books by Rent Price Range
- **Input:** Rent price range (min and max)
- **Output:** List of books within the specified rent range
- **Endpoint:** 
  ```http
  GET /books/filter?minRent={min}&maxRent={max}
#### Filter Books by Category, Name/Term, and Rent per Day
- **Input:** Category, name/term, and rent per day range
- **Output:** List of books matching the criteria
- **Endpoint:** 
  ```http
  GET /books/filter?category={category}&name={book_name}&minRent={min}&maxRent={max}
#### Transactions API
- **Input:** Book name, user name/userId, issue date
- **Output:** Update the transaction DB with these values
- **Endpoint:** 
  ```http
  POST /transactions/issueBook
#### Return Book
- **Input:** Book name, user name/userId, return date
- **Output:** Calculate rent based on issue date and return date, update the transaction DB
- **Endpoint:** 
  ```http
 POST /transactions/returnBook

