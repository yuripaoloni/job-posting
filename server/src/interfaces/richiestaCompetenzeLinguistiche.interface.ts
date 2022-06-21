import { RichiestaOfferta } from './richiestaOfferta.interface';

export interface RichiestaCompetenzeLinguistiche {
  id: number;
  lingua: string | null;
  livello: string;
  punti: number | null;
  richiestaOfferta?: RichiestaOfferta;
}
