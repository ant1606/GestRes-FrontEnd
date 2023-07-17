interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  rememberToken?: string | null;
}

interface Tag {
  id: number;
  nombre: string;
  estilos: string;
}
