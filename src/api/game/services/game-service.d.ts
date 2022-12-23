import {
  CollectionTypeService,
  GenericService,
} from "@strapi/strapi/lib/core-api/service";

export type GameService = GenericService & {
  getGame(id: string): Promise<any>;
  addCombatantToGame(game_id: string, id: string): Promise<any>;
  removeCombatantFromGame(game_id: string, id: string): Promise<any>;
  changeLocation(game_id: string, location: string): Promise<any>;
  changeMap(game_id: string, id: string): Promise<any>;
  giveDice(game_id: string, id: string): Promise<any>;
  takeDice(game_id: string): Promise<any>;
};
