// src/api/mentor.js
const MentorService = require('../services/mentorService');
const MentorValidator = require('../validator/mentorValidator');
const ResponseUtil = require('../utils/response');

const findMentorHandler = async (request, h) => {
  try {
    const { name, email, expertise } = request.payload;

    const validationResult = MentorValidator.findMentor(request.payload);
    if (validationResult.error) {
      return ResponseUtil.error(validationResult.error);
    }

    const mentors = await MentorService.findMentor({ name, email, expertise });

    return ResponseUtil.success(mentors);
  } catch (error) {
    console.error(error);
    return ResponseUtil.error(error.message);
  }
};

const createMentorHandler = async (request, h) => {
  try {
    const { name, email, expertise } = request.payload;

    const validationResult = MentorValidator.createMentor(request.payload);
    if (validationResult.error) {
      return ResponseUtil.error(validationResult.error);
    }

    const mentor = await MentorService.createMentor({ name, email, expertise });

    return ResponseUtil.success(mentor);
  } catch (error) {
    console.error(error);
    return ResponseUtil.error(error.message);
  }
};

module.exports = {
  findMentorHandler,
  createMentorHandler,
};