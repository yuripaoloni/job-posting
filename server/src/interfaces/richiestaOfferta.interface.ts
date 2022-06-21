import { OffertaLavoro } from './offertaLavoro.interface';
import { RichiestaCompetenzeLinguistiche } from './richiestaCompetenzeLinguistiche.interface';

export interface RichiestaOfferta {
  id: number;
  preparazione: string | null;
  puntiPreparazione: number | null;
  esperienzaLavorativa: boolean | null;
  puntiEsperienzaLavorativa: number | null;
  esperienzaUnicam: boolean | null;
  puntiEsperienzaUnicam: number | null;
  richiestaCompetenzeLinguistiches?: RichiestaCompetenzeLinguistiche[];
  offerta?: OffertaLavoro;
}
