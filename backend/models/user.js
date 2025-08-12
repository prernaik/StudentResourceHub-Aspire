   let users = []; // In-memory user storage

   const User = {
       create: (user) => {
           users.push(user);
           return user;
       },
       findById: (id) => users.find(user => user.id === id),
       findAll: () => users,
       // Additional methods can be added as needed
   };

   module.exports = User;
   