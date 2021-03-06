'use strict';

const expect = require('chai').expect;

const hooks = require('../../helpers/hooks/repository');
const generateTestsForBaseRepository = require('./base');
const { clearCollections } = require('../../helpers/database');

const { questionRepository } = require('../../../helpers/iocContainer').getAllDependencies();

const {
  questionsToCreate, questionToCreate, questionToUpdate, answer, authorId, tags
} = require('./data/question');

function cleanup() {
  return clearCollections([questionRepository.Model.modelName]);
}

describe('Question Repository', () => {
  const testOpts = {
    repository: questionRepository,
    data: {
      modelToCreate: questionToCreate,
      modelsToCreate: questionsToCreate,
      modelToUpdate: questionToUpdate
    }
  };

  before(hooks.before);

  generateTestsForBaseRepository(testOpts);

  describe('Getting', () => {
    before(() => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      return Promise.all(promises);
    });

    describe('#getAll', () => {
      it('should get all questions', async () => {
        const results = await questionRepository.getAll();
        const expectedLength = 3;

        expect(results).to.have.length(expectedLength);
      });
    });

    describe('#getByTags', () => {
      it('should get by tags array', async () => {
        const results = await questionRepository.getByTags(tags);
        const expectedLength = 2;

        expect(results).to.have.length(expectedLength);
      });

      it('should get by single tag', async () => {
        const results = await questionRepository.getByTags([tags[0]]);
        const expectedLength = 2;

        expect(results).to.have.length(expectedLength);
      });

      it('should not get by empty tags array', async () => {
        const results = await questionRepository.getByTags([]);

        return expect(results).to.be.empty;
      });
    });

    describe('#getById', () => {
      let newQuestionId;

      before(async () => {
        const newQuestion = await questionRepository.create(questionToCreate);

        newQuestionId = newQuestion._id;
      });

      it('should get questions with answers', async () => {
        const result = await questionRepository.getById(newQuestionId);

        return expect(result).to.exist;
      });
    });

    after(cleanup);
  });

  describe('=Embedded=', () => {
    let newQuestionId;
    let relatedAnswerId;

    beforeEach(async () => {
      const newQuestion = await questionRepository.create(questionToCreate);

      newQuestionId = newQuestion._id;
      relatedAnswerId = newQuestion.answers[0]._id;
    });

    describe('#addAnswer', () => {
      it('should add answer', async () => {
        await questionRepository.addAnswer(newQuestionId, answer);
        const updatedQuestion = await questionRepository.findById(newQuestionId);
        const expectedLength = 2;

        expect(updatedQuestion).to.have.property('answers').with.length(expectedLength);
        expect(updatedQuestion.answers[1]).to.deep.include(answer);
      });
    });

    describe('#updateAnswer', () => {
      it('should update answer', async () => {
        answer._id = relatedAnswerId;
        await questionRepository.updateAnswer(newQuestionId, answer);
        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.have.property('answers').with.length(1);
        expect(updatedQuestion.answers[0]).to.deep.include(answer);
      });
    });

    describe('#removeAnswer', () => {
      it('should delete answer', async () => {
        await questionRepository.removeAnswer(newQuestionId, relatedAnswerId);
        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.have.property('answers').with.length(0);
      });
    });

    describe('#voteUpQuestion', () => {
      it('should vote up', async () => {
        await questionRepository.voteUpQuestion(newQuestionId, authorId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        return expect(updatedQuestion).to.have.property('voters').that.is.not.empty;
      });
    });

    describe('#voteDownQuestion', () => {
      it('should vote down', async () => {
        await questionRepository.voteDownQuestion(newQuestionId, authorId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        return expect(updatedQuestion).to.have.property('voters').that.is.not.empty;
      });
    });

    describe('#voteUpAnswer', () => {
      it('should vote down', async () => {
        await questionRepository.voteUpAnswer(newQuestionId, relatedAnswerId, authorId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion.answers[0]).to.include({
          rating: 1
        });
      });
    });

    describe('#voteDownAnswer', () => {
      it('should vote down', async () => {
        await questionRepository.voteDownAnswer(newQuestionId, relatedAnswerId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion.answers[0]).to.include({
          rating: -1
        });
      });
    });
    afterEach(cleanup);
  });

  after(hooks.after);
});
