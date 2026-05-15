const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

const isValidArticle = `
    function isValidArticle(data) {
      return data.keys().hasAll(['storeOwnerId', 'name', 'description', 'price', 'imageUrl', 'tags', 'createdAt', 'updatedAt']) &&
             data.keys().size() == 8 &&
             data.storeOwnerId is string && data.storeOwnerId.size() <= 128 && data.storeOwnerId == request.auth.uid &&
             data.name is string && data.name.size() <= 100 &&
             data.description is string && data.description.size() <= 1000 &&
             data.price is number &&
             data.imageUrl is string && data.imageUrl.size() <= 1000 &&
             data.tags is list && data.tags.size() <= 20 &&
             data.createdAt is timestamp &&
             data.updatedAt is timestamp;
    }`;

const articleMatch = `
      match /articles/{articleId} {
         allow get: if true;
         allow list: if true;
         
         allow create: if isSignedIn() && isValidId(articleId) && clinicId == request.auth.uid &&
                          isValidArticle(incoming()) &&
                          incoming().createdAt == request.time &&
                          incoming().updatedAt == request.time;
                          
         allow update: if isSignedIn() && isValidId(articleId) && clinicId == request.auth.uid &&
                          isValidArticle(incoming()) &&
                          incoming().storeOwnerId == existing().storeOwnerId &&
                          incoming().createdAt == existing().createdAt &&
                          incoming().updatedAt == request.time &&
                          incoming().diff(existing()).affectedKeys().hasOnly(['updatedAt', 'name', 'description', 'price', 'imageUrl', 'tags']);
                          
         allow delete: if isSignedIn() && isValidId(articleId) && clinicId == request.auth.uid;
      }`;

if (!rules.includes('isValidArticle')) {
  rules = rules.replace('function isValidMessage(data) {', isValidArticle + '\n\n    function isValidMessage(data) {');
}

if (!rules.includes('match /articles/{articleId}')) {
  rules = rules.replace('match /messages/{messageId} {', articleMatch + '\n\n      match /messages/{messageId} {');
}

fs.writeFileSync('firestore.rules', rules);
