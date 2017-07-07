'use strict';

const mongoose = require('mongoose');

const questionsToCreate = [
  {
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 1',
    description: 'Babe don\'t hurt me',
    tags: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    attachments: [
      '/uploads/32342.jpg'
    ],
    answers: []
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 2',
    description: 'No more',
    tags: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    attachments: [
      '/uploads/32342.jpg'
    ],
    answers: [
      {
        rating: 0,
        author: new mongoose.Types.ObjectId(),
        text: 'Yeah',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    author: new mongoose.Types.ObjectId(),
    title: 'What is love 3',
    description: 'No more',
    tags: [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ],
    attachments: [
      '/uploads/32342.jpg'
    ]
  }
];

const questionToCreate = {
  author: new mongoose.Types.ObjectId(),
  title: 'What is love 4',
  description: 'No more',
  tags: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
  ]
};

const questionToUpdate = {
  title: 'Ring-ring',
  description: 'No more',
  tags: [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
  ]
};

const pathToAttaches = './server/tests/integration/data/attachments/';

module.exports = {
  questionsToCreate,
  questionToCreate,
  pathToAttaches,
  questionToUpdate
};