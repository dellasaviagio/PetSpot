// app/entities/User.ts

export interface User {
    id: string;              // Identificador único do usuário
    name: string;           // Nome do usuário
    email: string;          // Email do usuário
    profilePicture?: string; // URL da foto do perfil do usuário
    petsOwned: string[];    // IDs dos pets que o usuário possui
  }
  