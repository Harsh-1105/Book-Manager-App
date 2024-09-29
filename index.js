import express, { query } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { User } from "./models/userModel.js";
import { Transaction } from "./models/transactionModel.js";
import moment from "moment";
import 'dotenv/config'

const app = express();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(234).send("Hello From /");
// });
/*----------------Add Book----------------------------------------------------------- */
app.post("/AddBook", async (req, res) => {
  try {
    if (!req.body.book_name || !req.body.category || !req.body.rentPerDay) {
      return res.status(400).send({
        message: "send all required feilds",
      });
    }
    const newBook = {
      book_name: req.body.book_name,
      category: req.body.category,
      rentPerDay: req.body.rentPerDay,
    };
    const book = await Book.create(newBook);

    res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
/*----------------------Get All Book---------------------------------------------------- */

app.get("/getAllBooks", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
/*----------------------Search A Book---------------------------------------------------- */
app.get("/getAllBooks/Search", async (req, res) => {
  const { name, min, max, category } = req.query;

  let query = {};
  if (name) query.book_name = { $regex: name, $options: "i" };

  if (min || max) {
    query.rentPerDay = {};
    if (min) query.rentPerDay.$gt = Number(min);
    if (max) query.rentPerDay.$lt = Number(max);
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  try {
    const books = await Book.find(query);

    if (books.length === 0) {
      return res.status(404).json({ message: "No Books Found" });
    }
    console.log(query);

    return res.status(200).json(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
/*----------------------Add User------------------------------------------------------ */

app.post("/AddUser", async (req, res) => {
  try {
    if (!req.body.user_name || !req.body.user_email) {
      return res.status(400).send({
        message: "Enter a Valid User",
      });
    }
    const newUser = {
      user_name: req.body.user_name,
      user_email: req.body.user_email,
    };
    const user = await User.create(newUser);
    return res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
/*----------------------Get All Users------------------------------------------------------ */
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
/*----------------------Issue A Book--------------------------------------------------------- */
app.post("/transactions/issueDate", async (req, res) => {
  const { book_name, user_name, issueDate } = req.query;

  try {
    if (!book_name || !user_name) {
      return res.status(400).json({ message: "Invalid Book or User ID" });
    }
    const book = await Book.findOne({
      book_name: { $regex: book_name, $options: "i" },
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const user = await User.findOne({
      user_name: { $regex: user_name, $options: "i" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newTransaction = await Transaction.create({
      book_id: book._id,
      user_id: user._id,
      issueDate: new Date(issueDate),
      returnDate: null,
    });
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

/*----------------------Return Book------------------------------------*/
app.post("/transactions/returnDate", async (req, res) => {
  const { book_name, user_name, returnDate } = req.query;

  try {
    if (!book_name || !user_name) {
      return res.status(400).json({ message: "Invalid Book or User Name" });
    }

    // Find the book
    const book = await Book.findOne({
      book_name: { $regex: book_name, $options: "i" },
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find the user
    const user = await User.findOne({
      user_name: { $regex: user_name, $options: "i" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the transaction
    const transaction = await Transaction.findOne({
      book_id: book._id,
      user_id: user._id,
      returnDate: null, // Only open transactions
    });
    if (!transaction) {
      return res.status(404).json({
        message: "No active transaction found for this user and book",
      });
    }

    // Parse the returnDate from query (ensure the format is DD-MM-YYYY)
    const parsedReturnDate = returnDate;
    //   console.log("Parsed Return Date:", parsedReturnDate);

    // Issue date from the transaction
    //   console.log("Transaction Issue Date:", transaction.issueDate);

    // Calculate the rent based on issue and return dates
    const daysRented = moment(parsedReturnDate).diff(
      moment(transaction.issueDate),
      "days"
    );
    //   console.log("Days Rented:", daysRented);

    // If the book was returned on the same day, charge for at least 1 day
    const daysToCharge = daysRented <= 0 ? 1 : daysRented;

    // Calculate total rent
    const totalRent = daysToCharge * book.rentPerDay;
    //   console.log(`Total Rent for ${daysToCharge} days: ₹${totalRent}`);

    // Update the transaction with return date
    transaction.returnDate = parsedReturnDate;
    await transaction.save();

    res.status(201).json({
      message: `Book returned successfully.`,
      totalRent: `Total rent for ${daysToCharge} days is ₹${totalRent}`,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
/*----------------------Connect DataBase------------------------------------------------------ */
mongoose
  .connect(process.env.MongoDBURL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port ${process.env.PORT}`);
    });
    console.log("App connected to Database");
  })
  .catch((err) => {
    console.log(err);gi
  });
