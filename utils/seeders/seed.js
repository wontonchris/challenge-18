const connection = require('../../config/connection');
const { Thought, User } = require('../../models');


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
    'KobeIsTheGoat',
    'MJIsTheGoat',
    'KareemIsTheGoat',
    'WiltIsTheGoat',
    'BillRussellIsTheGoat',
  ];

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 10; i++) {
    thoughts.push({
      thoughtText: thoughtText[i],
      userName: userName[i],
    });
  }

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Seed Email for users
  const email = [
    'ByronDaTeacher@gmail.com',
    'ChrisTheTA@gmail.com',
    'JoshDaGoat@gmail.com',
    'CollinIsBallin@gmail.com',
    'LebroncoTuesdays@gmail.com',
  ];

  const getAllThoughts = await Thought.find({});
  const thoughtIDs = getAllThoughts.map((thought) => thought._id);
  const users = [];

  // Add seed user info to array
  for (let i = 0; i < 5; i++) {
    users.push({
      userName: userName[i],
      email: email[i],
      thoughts: [thoughtIDs[i]],
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  console.table(thoughts);
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
