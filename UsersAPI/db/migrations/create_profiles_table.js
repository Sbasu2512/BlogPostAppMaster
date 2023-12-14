const createProfilesTable=`
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles(
    id uuid PRIMARY KEY,
    displayName VARCHAR(255),
    profilePicture VARCHAR(255),
    description VARCHAR(1000),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    last_online date
);`;

export default createProfilesTable;