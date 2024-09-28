// app/entities/Pet.ts

export interface Pet {
  id: string;              // Identificador único do pet
  name: string;           // Nome do pet
  birthdate: Date;       // Data de nascimento do pet
  type: string;           // Tipo de pet (ex: cão, gato, etc.)
  breed: string;          // Raça do pet
  description?: string;   // Descrição do pet
  image: any;            // Imagem do pet (você pode ajustar isso conforme necessário)
  ownerId: string;        // ID do usuário que é o dono do pet
}
