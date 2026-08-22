const UserModel = require('../models/user.model');

const firstNames = ['Mohamed', 'Ahmed', 'Yassine', 'Amine', 'Omar', 'Karim', 'Sami'];
const lastNames = ['Ben Ali', 'Trabelsi', 'Mansouri', 'Jaziri', 'Gharbi', 'Ayari', 'Haddad'];
const cities = ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Nabeul', 'Gabes', 'Monastir'];

const defaultUsers = Array.from({ length: 49 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length)];
  const city = cities[index % cities.length];

  return {
    name: `${firstName} ${lastName}`,
    email: `utilisateur${index + 1}@example.tn`,
    password: 'password123',
    age: 22 + (index % 35),
    role: 'user',
    phone: `+216 2${String(1000000 + index).padStart(7, '0')}`,
    address: city
  };
});

defaultUsers.push({
  name: 'Administrateur Demo',
  email: 'admin@example.tn',
  password: 'admin123',
  age: 35,
  role: 'admin',
  phone: '+216 71123456',
  address: 'Tunis',
  experience: 10,
  specialization: 'Gestion'
});

module.exports.seedDefaultUsers = async () => {
  await UserModel.deleteMany({
    email: { $regex: /^(user\d*|admin)@example\.com$/ }
  });

  for (const userData of defaultUsers) {
    await UserModel.updateOne(
      { email: userData.email },
      { $setOnInsert: userData },
      { upsert: true }
    );
  }

  console.log('Utilisateurs par défaut vérifiés');
};