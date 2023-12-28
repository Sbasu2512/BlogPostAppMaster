export function likesAndDislikesCounter(posts) {
  
// Create an object to store counts of likes and dislikes for each post ID
const postCounts = {};

// Iterate through the data
posts.forEach(post => {
  const postId = post.id;

  // If the post ID exists in the postCounts object, increment the counts
  if (postCounts[postId]) {
    postCounts[postId].likes++;
    postCounts[postId].dislikes++;
  } else { // If the post ID is not found, initialize counts with the current values
    postCounts[postId] = {
      likes: 1,
      dislikes: 1
    };
  }
});

const uniquePosts = {}; // Store unique posts based on their IDs

// Update the posts array with counts for duplicate posts and keep one instance of each unique post
const updatedData = posts.reduce((accumulator, post) => {
  const postId = post.id;

  if (!uniquePosts[postId]) {
    uniquePosts[postId] = true;

    if (postCounts[postId] && postCounts[postId].likes > 1) {
      post.likes = postCounts[postId].likes.toString();
      post.dislikes = postCounts[postId].dislikes.toString();
    }
    accumulator.push(post);
  }

  return accumulator;
}, []);

console.log(updatedData);
return updatedData;
}

