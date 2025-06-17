const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//Get all boards
app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.json(boards)
})

//Create board
app.post('/boards', async (req, res) => {
    const { title, image_url, author, category, time_created, cards } = req.body
    const newBoard = await prisma.book.create({
      Board: {
        title,
        image_url,
        author,
        category,
        time_created,
        cards
      }
    })
    res.json(newBoard)
})

//Create card
app.post('/cards', async (req, res) => {
    const { title, image_url, message, author, time_created, board_id } = req.body
    const newCard = await prisma.book.create({
      Card: {
        title,
        image_url,
        message,
        author,
        time_created,
        board_id,
      }
    })
    res.json(newCard)
})
