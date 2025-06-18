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

//Get all boards that match query
app.get('/boards', async (req, res) => {
    if (req.query.category === '' || req.query.category == 'All'){
        const boards = await prisma.board.findMany();
        res.json(boards);
    }
    else if (req.query.category == 'Recent'){
        const boards = await prisma.board.findMany({
          orderBy: {
            time_created: 'desc',
          },
          take: 6,
        });
        res.json(boards);
    }
    else{
      const boards = await prisma.board.findMany({where: {category : {equals : req.query.category}}});
      res.json(boards);
    }
})

//Get boards that match search
app.get('/boards/search', async (req, res) => {
    const boards = await prisma.board.findMany({where: {title : {contains : req.query.search, mode: 'insensitive'}}});
    res.json(boards);
})

//Create board
app.post('/boards', async (req, res) => {
    const { title, author, category } = req.body
    try{
      const newBoard = await prisma.board.create({
        data: {
          title : title,
          image : "https://picsum.photos/200/300",
          author : author || "Anonymous",
          category : category,
          time_created : Math.floor(Date.now() / 1000)
        }
      })
      res.json(newBoard)
    }
    catch(e){
      console.log(e);
    }
})

//Delete board
app.delete('/boards/:id', async (req, res) => {
  const { id } = req.params
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(id) }
  })
  res.json(deletedBoard)
})

//Create card
app.post('/cards', async (req, res) => {
    const { title, image, message, author, time_created, board_id } = req.body
    const newCard = await prisma.card.create({
      data: {
        title,
        image,
        message,
        author,
        time_created,
        board_id,
      }
    })
    res.json(newCard)
})
