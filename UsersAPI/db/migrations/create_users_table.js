const createUsersTable=`
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id uuid PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdOn Date NOT NULL,
    isVerifiedEmail BOOLEAN,
    token VARCHAR(1000)
);`;

export default createUsersTable;