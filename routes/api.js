const express = require('express')

const Question = require('../models/Question')
const authentication = require('../middlewares/isAuthenticated')

const router = express.Router()

// retrieves all questions
router.get('/questions', async (req, res, next) => {
  try {
    const questions = await Question.find()
    if (questions) {
      res.send(`All of the existing questions have been retrieved!`)
    } else {
      res.send(`There are no existing questions!`)
    }
  } catch (error) {
    next(new Error(`Error inside /questions with error message: ${error}`))
  }
})

// creates a new question with questionText and author
router.post('/questions/add', authentication, async (req, res, next) => {
  const { body, session } = req
  const { questionText } = body
  const { username } = session

  try {
    const addedQuestion = await Question.create({ questionText, author: username })
    res.send(`The question with id "${addedQuestion._id}" has been created!`)
  } catch (error) {
    next(new Error(`Error inside /questions/add with error message: ${error}`))
  }
})

// updates the answer to a question
router.post('/questions/answer', authentication, async (req, res, next) => {
  const { body } = req
  const { _id, answer } = body

  try {
    await Question.updateOne({ _id }, { answer })
    res.send(`The question with id "${_id}" has been answered!`)
  } catch (error) {
    next(new Error(`Error inside /questions/answer with error message: ${error}`))
  }
})