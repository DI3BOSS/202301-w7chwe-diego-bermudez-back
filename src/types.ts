export type UserStructure = {
  username: string;
  password: string;
  name: string;
  avatar: string;
  email: string;
  aboutme: string;
  relationships: {
    friends: string[];
    foes: string[];
  };
};
export type UsersStructure = UserStructure[];
