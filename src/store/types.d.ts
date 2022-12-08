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
  name?: string;
  email?: string;
  univName?: string;
  uid?: string;
  univId?: string;
  sessionToken?: string;
}

interface ErrorMessage {
  code: string;
  message: string;
}
