export default [
  {
    matches: (request) => {
      return request.originalUrl === '/surveys' && request.method === 'POST';
    },

    verify: (request) => {
      let errors = [];

      if(!request.body.description) {
        errors.push({
          path: 'description',
          message: 'Survey description is required.'
        });
      }

      return errors;
    }
  }
];
