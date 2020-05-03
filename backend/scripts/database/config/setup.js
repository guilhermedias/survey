db.createUser({
  user: 'survey',
  pwd: 'survey',
  roles: [
    { role: 'readWrite', db: 'survey' }
  ]
});

db.createCollection('surveys');

db
  .getCollection('surveys')
  .insert({
    _id: NumberInt(1),
    description: 'Survey description 1.',
    numberOfChoices: NumberInt(7),
    items: [
      {
        id: 1,
        statement: 'Likert item statement 1.'
      },
      {
        id: 2,
        statement: 'Likert item statement 2.'
      }
    ]
  });
