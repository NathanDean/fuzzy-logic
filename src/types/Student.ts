export interface RawStudent {
  id: string;
  email?: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
  };
}

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
