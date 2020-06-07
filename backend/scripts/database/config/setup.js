db.createUser({
  user: 'survey',
  pwd: 'survey',
  roles: [
    { role: 'readWrite', db: 'survey' }
  ]
});

// Surveys
db.createCollection('surveys');

db
  .getCollection('surveys')
  .insert({
    '_id' : new ObjectId('5eb886c46e5e19fccfa7cea7'),
    'description' : 'Survey 1.',
    'numberOfChoices' : NumberInt(5),
    'items' : [
      {
        '_id' : new ObjectId('5eb886c46e5e19fccfa7cea8'),
        'id' : NumberInt(1),
        'statement' : 'Statement 1.'
      },
      {
        '_id' : new ObjectId('5eb886c46e5e19fccfa7cea9'),
        'id' : NumberInt(2),
        'statement' : 'Statement 2.'
      }
    ],
    'surveyId' : NumberInt(1),
    '__v' : NumberInt(0)
  });

// Answers
db.createCollection('answers');

db
  .getCollection('answers')
  .insert(
    [
      {
        '_id' : new ObjectId('5eb886fd6e5e19fccfa7ceaa'),
        'surveyId' : NumberInt(1),
        'items' : [
          {
            '_id' : new ObjectId('5eb886fd6e5e19fccfa7ceab'),
            'id' : NumberInt(1),
            'selected' : NumberInt(4)
          },
          {
            '_id' : new ObjectId('5eb886fd6e5e19fccfa7ceac'),
            'id' : NumberInt(2),
            'selected' : NumberInt(5)
          }
        ],
        'answerId' : NumberInt(1),
        '__v' : NumberInt(0)
      },
      {
        '_id' : new ObjectId('5eb886fe6e5e19fccfa7cead'),
        'surveyId' : NumberInt(1),
        'items' : [
          {
            '_id' : new ObjectId('5eb886fe6e5e19fccfa7ceae'),
            'id' : NumberInt(1),
            'selected' : NumberInt(4)
          },
          {
            '_id' : new ObjectId('5eb886fe6e5e19fccfa7ceaf'),
            'id' : NumberInt(2),
            'selected' : NumberInt(5)
          }
        ],
        'answerId' : NumberInt(2),
        '__v' : NumberInt(0)
      }
    ]
  );

// Counters
db.createCollection('counters');

db
  .getCollection('counters')
  .insert(
    [
      {
        '_id' : new ObjectId('5eb886c4bd394d609666543c'),
        'id' : 'surveyId',
        'reference_value' : null,
        'seq' : NumberInt(1)
      },
      {
        '_id' : new ObjectId('5eb886fdbd394d6096665468'),
        'id' : 'answerId',
        'reference_value' : null,
        'seq' : NumberInt(2)
      }
    ]
  );
