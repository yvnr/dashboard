/**
 * Maintiaing all defined data types here
 */
interface UserRegisterState {
  name?: string;
  email?: string;
  password?: string;
  univId?: string;
}

interface LoginState {
  email?: string;
  password?: string;
}

interface UserState {
  name: string | null;
  email: string | null;
  univName: string | null;
  uid: string | null;
  univId: string | null;
  sessionToken: string | null;
  reloadToggle: boolean;
}

interface ErrorMessage {
  code: string;
  message: string;
}
