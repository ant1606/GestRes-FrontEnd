interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  rememberToken?: string | null;
}
