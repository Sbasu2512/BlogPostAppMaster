export function likesAndDislikesCounter(posts) {
    const newPostsArr = [];
  for (let i = 0; i <= posts.length - 1; i++) {
      if (posts[i+1]?.id === posts[i].id) {
        let likes = 0;
        let dislikes = 0;
      //duplicate post
      //check for likes
      if (posts[i].likes) likes++;
      if (posts[i + 1].likes) likes++;
      //check for dislikes
      if(posts[i].dislikes) dislikes++;
      if(posts[i].dislikes) dislikes++;
      //assign the values with likes
      const postsWithLikes = {
        id: posts[i+1].id,
        post_title: posts[i+1].post_title,
        post_body: posts[i+1].post_body,
        createdon: posts[i+1].createdon,
        tag: posts[i+1].tag,
        is_draft: posts[i+1].is_draft,
        is_published: posts[i+1].is_published,
        is_edited: posts[i+1].is_edited,
        edited_on: posts[i+1].edited_on,
        user_id: posts[i+1].user_id,
        displayname: posts[i+1].displayname,
        dislikes: dislikes,
        likes: likes,
      };
      //push the new obj with updated likes values in a separate array
      newPostsArr.push(postsWithLikes);
      //remove both the duplicate element
      posts.splice(i,i+1);
    }else{
        newPostsArr.push(posts[i])
    }
  }
//  console.log(newPostsArr)
  return newPostsArr;
}
