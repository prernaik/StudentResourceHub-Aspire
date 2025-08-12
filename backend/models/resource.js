   let resources = []; // In-memory resource storage

   const Resource = {
       create: (resource) => {
           resources.push(resource);
           return resource;
       },
       findById: (id) => resources.find(resource => resource.id === id),
       findAll: () => resources,
       // Additional methods can be added as needed
   };

   module.exports = Resource;
   