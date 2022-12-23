import {
  CollectionTypeService,
  GenericService,
} from "@strapi/strapi/lib/core-api/service";

export type CombatantService = GenericService & {
  changeHealth(id: string, value: number): Promise<void>;
};
