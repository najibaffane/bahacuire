
import { Product } from './types';

export const BRAND_NAME = "BAHA CUIR";
export const BRAND_MOTTO = "Chaque pièce cousue à la main, sans compromis.";
export const BRAND_STORY = "Cuir authentique, travail minutieux depuis 2020.";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Le Cartable Bleu Abysse',
    category: 'bags',
    price: 98000,
    description: 'Une pièce maîtresse en cuir bleu marine profond, avec bouclerie en laiton massif.',
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800'],
    details: ['Couture main intégrale', 'Cuir pleine fleur tannage végétal', 'Poches compartimentées'],
    realizationTime : "24 heures de main d'œuvre",
    waitingTime: "4 à 6 semaines"
  },
  {
    id: '2',
    name: 'Pochette Nomade Charbon',
    category: 'accessories',
    price: 25000,
    description: 'Compacte et fonctionnelle pour vos essentiels numériques.',
    images: ['https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800'],
    details: ['Zip YKK haute résistance', 'Doublure protectrice', 'Passage de câble intégré'],
    realizationTime : "6 heures de main d'œuvre",
    waitingTime: "2 semaines"
  },
  {
    id: '3',
    name: 'La Besace Cognac Héritage',
    category: 'bags',
    price: 65000,
    description: 'Un classique indémodable. Ce sac à l\'épaule en cuir tan développera une patine exceptionnelle.',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'],
    details: ['Bords polis à la main', 'Bandoulière réglable', 'Cuir gras 2.2mm'],
    realizationTime : "16 heures de main d'œuvre",
    waitingTime: "3 à 4 semaines"
  }
];

export const SHOWCASE_STEPS = [
  {
    title: "Sélection du Cuir",
    description: "Nous sélectionnons uniquement les peaux de premier choix provenant de tanneries françaises renommées pour leur tannage végétal respectueux de l'environnement.",
    image: "https://images.unsplash.com/photo-1524295928134-71ad07ff731d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Coupe à la Main",
    description: "Chaque pièce est découpée individuellement à la main, en suivant les lignes de force naturelles de la peau pour garantir une durabilité maximale.",
    image: "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Couture au Point de Sellier",
    description: "Le point de sellier à deux aiguilles est le sommet de la maroquinerie. Indémaillable et d'une solidité à toute épreuve, il est le garant de l'exceptionnel.",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800"
  }
];
