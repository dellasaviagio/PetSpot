// app/entities/Event.ts

import { ImageSourcePropType } from 'react-native';

export interface Event {
    id: string;                          // Identificador único do evento
    title: string;                       // Título do evento
    description?: string;                // Descrição do evento
    date: Date;                          // Data do evento
    location: string;                    // Localização do evento
    imageUrl: ImageSourcePropType;      // Imagem do evento
}
