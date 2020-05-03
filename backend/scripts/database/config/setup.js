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
    id: NumberInt(1),
    description: 'Survey description 1.',
    numberOfChoices: NumberInt(7),
    items: [
      {
        id: NumberInt(1),
        statement: 'Likert item statement 1.'
      },
      {
        id: NumberInt(2),
        statement: 'Likert item statement 2.'
      }
    ]
  });
