export default [
  {
    matches: (request) => {
      return request.originalUrl.match(/\/surveys/) && (
        request.method === 'PUT' ||
        request.method === 'POST'
      );
    },

    verify: (request) => {
      let errors = [];

      if(!request.body.description) {
        errors.push({
          path: 'description',
          message: 'Survey description is required.'
        });
      }

      if(!request.body.numberOfChoices) {
        errors.push({
          path: 'numberOfChoices',
          message: 'Number of choices is required.'
        });
      }

      if(!request.body.items) {
        errors.push({
          path: 'items',
          message: 'Survey items are required.'
        });
      } else {
        request.body.items.forEach((item, index) => {
          if(!item.id) {
            errors.push({
              path: `items[${index}].id`,
              message: 'Survey item ID is required.'
            });
          }

          if(!item.statement) {
            errors.push({
              path: `items[${index}].statement`,
              message: 'Survey item statement is required.'
            });
          }
        });
      }

      return errors;
    }
  }
];
