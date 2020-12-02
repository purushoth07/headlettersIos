// User model based on the structure of github api at
// https://api.github.com/users/{username}
export interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;

  id:string;
  user_name:string;
  access_token:string;
  api_token:string;
  first_name:string;
  last_name:string;
  email:string;
  phone:string;
  user_image:string;
  login_with:string;
  gender:string;
  
}