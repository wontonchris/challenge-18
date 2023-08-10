const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }


  // Create empty array to hold the students
  const thoughts = [];

  const thoughtText = [
    'I am so happy',
    'I love this class',
    'I hate this class',
    'I am so tired',
    'I am so hungry',
    'Will I ever achieve my goals?',
    'Will I ever be happy?',
    'I am so sad',
    'I am so lonely',
    'Lebron is the GOAT',

  ];

  const userName = [
    'ByronDaTeacher',
    'ChrisTheTA',
    'JoshDaGoat',
    'CollinIsBallin',
    'LebroncoTuesdays',

  ];


  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    const thoughtText = thoughtText[i];
    const userName = userName[i];

    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
