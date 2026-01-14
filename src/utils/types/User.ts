export default interface User {
  id: string;
  email?: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}
