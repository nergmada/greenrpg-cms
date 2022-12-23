import {
  CollectionTypeService,
  GenericService,
} from "@strapi/strapi/lib/core-api/service";

export type PlayerService = GenericService & {
  updatePool(id: string, pool: string, value: number): Promise<any>;
};
