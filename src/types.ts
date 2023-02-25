export interface UserStructure {
  username: string;
  password: string;
  name: string;
  avatar: string;
  email: string;
  aboutme: string;
  relationships: {
    friends: [];
    foes: [];
  };
}
export type UsersStructure = UserStructure[];
