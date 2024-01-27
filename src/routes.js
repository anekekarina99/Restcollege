const Hapi = require('hapi');
const Joi = require('@hapi/joi');
const MentorService = require('./services/mentorService');

const routes = [
  {
    method: 'GET',
    path: '/mentors',
    options: {
      handler: async (request, h) => {
        const mentors = await MentorService.findMentors();
        return h.response(mentors);
      },
    },
  },
  {
    method: 'POST',
    path: '/mentors',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          expertise: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
      handler: async (request, h) => {
        const mentor = await MentorService.createMentor(request.payload);
        return h.response(mentor).created();
      },
    },
  },
  {
    method: 'GET',
    path: '/mentors/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      handler: async (request, h) => {
        const mentor = await MentorService.findMentorById(request.params.id);
        return h.response(mentor);
      },
    },
  },
  {
    method: 'PUT',
    path: '/mentors/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          expertise: Joi.string().required(),
        }),
      },
      handler: async (request, h) => {
        const mentor = await MentorService.updateMentor(request.params.id, request.payload);
        return h.response(mentor);
      },
    },
  },
  {
    method: 'DELETE',
    path: '/mentors/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      handler: async (request, h) => {
        await MentorService.deleteMentor(request.params.id);
        return h.response().code(204);
      },
    },
  },
];

module.exports = routes;
