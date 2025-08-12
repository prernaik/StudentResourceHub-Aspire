   let comments = []; // In-memory comment storage

   const Comment = {
       create: (comment) => {
           comments.push(comment);
           return comment;
       },
       findByResourceId: (resourceId) => comments.filter(comment => comment.resourceId === resourceId),
       // Additional methods can be added as needed
   };

   module.exports = Comment;
   