import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  RichTextAttribute,
  MediaAttribute,
  ComponentAttribute,
  UIDAttribute,
  ComponentSchema,
} from "@strapi/strapi";

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">;
    permissions: RelationAttribute<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"">;
    type: EnumerationAttribute<["read-only", "full-access", "custom"]> &
      RequiredAttribute &
      DefaultTo<"read-only">;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      "admin::api-token",
      "oneToMany",
      "admin::api-token-permission"
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: "API Token Permission";
    description: "";
    singularName: "api-token-permission";
    pluralName: "api-token-permissions";
    displayName: "API Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      "admin::api-token-permission",
      "manyToOne",
      "admin::api-token"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<"plugin::upload.file", "morphToMany">;
    folder: RelationAttribute<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiAbilityAbility extends CollectionTypeSchema {
  info: {
    singularName: "ability";
    pluralName: "abilities";
    displayName: "Ability";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    description: RichTextAttribute;
    type: EnumerationAttribute<["action", "enabler"]> & DefaultTo<"action">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::ability.ability",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::ability.ability",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiCampaignCampaign extends CollectionTypeSchema {
  info: {
    singularName: "campaign";
    pluralName: "campaigns";
    displayName: "Campaign";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    description: RichTextAttribute;
    players: RelationAttribute<
      "api::campaign.campaign",
      "oneToMany",
      "api::player.player"
    >;
    maps: RelationAttribute<
      "api::campaign.campaign",
      "oneToMany",
      "api::map.map"
    >;
    combatants: RelationAttribute<
      "api::campaign.campaign",
      "oneToMany",
      "api::combatant.combatant"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::campaign.campaign",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::campaign.campaign",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiCombatantCombatant extends CollectionTypeSchema {
  info: {
    singularName: "combatant";
    pluralName: "combatants";
    displayName: "Combatant";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    description: RichTextAttribute;
    icon: MediaAttribute;
    health: ComponentAttribute<"player.stat-pool">;
    tier: IntegerAttribute;
    armor: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::combatant.combatant",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::combatant.combatant",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiGameGame extends CollectionTypeSchema {
  info: {
    singularName: "game";
    pluralName: "games";
    displayName: "Game";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    game_id: UIDAttribute;
    campaign: RelationAttribute<
      "api::game.game",
      "oneToOne",
      "api::campaign.campaign"
    >;
    active_combatants: ComponentAttribute<"general.active-combatant", true>;
    current_map: RelationAttribute<
      "api::game.game",
      "oneToOne",
      "api::map.map"
    >;
    current_location: ComponentAttribute<"maps.map-icon">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::game.game", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"api::game.game", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface ApiMapMap extends CollectionTypeSchema {
  info: {
    singularName: "map";
    pluralName: "maps";
    displayName: "Map";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    description: RichTextAttribute;
    main: MediaAttribute;
    icons: ComponentAttribute<"maps.map-icon", true>;
    images: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::map.map", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"api::map.map", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface ApiPlayerPlayer extends CollectionTypeSchema {
  info: {
    singularName: "player";
    pluralName: "players";
    displayName: "Player";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    icon: MediaAttribute;
    meta: ComponentAttribute<"player.player-stats">;
    pools: ComponentAttribute<"player.pools">;
    abilities: RelationAttribute<
      "api::player.player",
      "oneToMany",
      "api::ability.ability"
    >;
    description: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::player.player",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::player.player",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface GeneralActiveCombatant extends ComponentSchema {
  info: {
    displayName: "Active Combatant";
    icon: "american-sign-language-interpreting";
  };
  attributes: {
    combatant: RelationAttribute<
      "general.active-combatant",
      "oneToOne",
      "api::combatant.combatant"
    >;
    health: ComponentAttribute<"player.stat-pool">;
  };
}

export interface GeneralDescription extends ComponentSchema {
  info: {
    displayName: "Description";
    icon: "align-justify";
  };
  attributes: {
    title: StringAttribute;
    body: RichTextAttribute;
  };
}

export interface MapsMapIcon extends ComponentSchema {
  info: {
    displayName: "Map Icon";
    icon: "anchor";
    description: "";
  };
  attributes: {
    icon: MediaAttribute;
    x: DecimalAttribute;
    y: DecimalAttribute;
    description: ComponentAttribute<"general.description">;
    images: MediaAttribute;
  };
}

export interface PlayerEdge extends ComponentSchema {
  info: {
    displayName: "Edge";
    icon: "angle-double-up";
  };
  attributes: {
    might: IntegerAttribute;
    intellect: IntegerAttribute;
    speed: IntegerAttribute;
  };
}

export interface PlayerPlayerStats extends ComponentSchema {
  info: {
    displayName: "Player Stats";
    icon: "address-card";
  };
  attributes: {
    tier: IntegerAttribute;
    type: EnumerationAttribute<["warrior", "adept", "explorer", "speaker"]>;
    effort: IntegerAttribute;
    edge: ComponentAttribute<"player.edge">;
  };
}

export interface PlayerPools extends ComponentSchema {
  info: {
    displayName: "Pools";
    icon: "ankh";
  };
  attributes: {
    health: ComponentAttribute<"player.stat-pool">;
    might: ComponentAttribute<"player.stat-pool">;
    intellect: ComponentAttribute<"player.stat-pool">;
    speed: ComponentAttribute<"player.stat-pool">;
    luck: ComponentAttribute<"player.stat-pool">;
  };
}

export interface PlayerStatPool extends ComponentSchema {
  info: {
    displayName: "Pool";
    icon: "arrow-alt-circle-right";
  };
  attributes: {
    max: IntegerAttribute;
    current: IntegerAttribute;
  };
}

declare global {
  namespace Strapi {
    z;
    interface Schemas {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "admin::api-token-permission": AdminApiTokenPermission;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::i18n.locale": PluginI18NLocale;
      "api::ability.ability": ApiAbilityAbility;
      "api::campaign.campaign": ApiCampaignCampaign;
      "api::combatant.combatant": ApiCombatantCombatant;
      "api::game.game": ApiGameGame;
      "api::map.map": ApiMapMap;
      "api::player.player": ApiPlayerPlayer;
      "general.active-combatant": GeneralActiveCombatant;
      "general.description": GeneralDescription;
      "maps.map-icon": MapsMapIcon;
      "player.edge": PlayerEdge;
      "player.player-stats": PlayerPlayerStats;
      "player.pools": PlayerPools;
      "player.stat-pool": PlayerStatPool;
    }
  }
}
