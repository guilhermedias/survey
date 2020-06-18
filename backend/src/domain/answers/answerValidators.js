export default [
  {
    matches: (request) => {
      return request.originalUrl.match(/\/answers/) && (
        request.method === 'POST'
      );
    },

    verify: (request) => {
      let errors = [];

      if(!request.body.surveyId) {
        errors.push({
          path: 'surveyId',
          message: 'Survey ID is required.'
        });
      }

      if(!request.body.items) {
        errors.push({
          path: 'items',
          message: 'Answer items are required.'
        });
      } else {
        request.body.items.forEach((item, index) => {
          if(!item.id) {
            errors.push({
              path: `items[${index}].id`,
              message: 'Answer item ID is required.'
            });
          }

          if(!item.selected) {
            errors.push({
              path: `items[${index}].selected`,
              message: 'Answer selected choice is required.'
            });
          }
        });
      }

      return errors;
    }
  }
];
