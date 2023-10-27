import Team from './Team';

interface Player {
    id: number;
    name: string;
    surname: string;
    team_id?: number;  // Jest opcjonalny w schemacie
    nationality?: string; // Jest opcjonalny w schemacie
    position?: string; // Jest opcjonalny w schemacie
    salary: number; // Choć w bazie jest Decimal, w JS będzie to przetwarzane jako number
    imagePath?: string;
    team?: Team; // Referencja do interfejsu Team
  }

  export default Player;