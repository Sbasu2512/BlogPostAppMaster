const alterPostsTable=`
ALTER TABLE posts
    DROP COLUMN likesCount,
    DROP COLUMN dislikesCount
;`;

export default alterPostsTable;