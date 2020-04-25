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
    id: 1
  });
