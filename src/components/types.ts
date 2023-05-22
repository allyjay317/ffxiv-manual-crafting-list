import { SelectChangeEvent } from '@mui/material'

export enum GatheringJobs {
  Botanist = 'btn',
  Miner = 'min',
  Fisher = 'fsh',
  Carpenter = 'crp',
  Blacksmith = 'bsm',
  Armorer = 'arm',
  Goldsmith = 'gsm',
  Leatherworker = 'ltw',
  Weaver = 'wvr',
  Alchemist = 'alc',
  Culinarian = 'cul',
  Battle = 'DoW',
  Buy = 'buy',
}

export type SelectOption<T extends string> = {
  label: string
  value: T
}

export enum Locations {
  Garlemald = 'Garlemald',
  Labyrinthos = 'Labyrinthos',
  Thavnair = 'Thavnair',
  'Mare Lamentorium' = 'Mare Lamentorium',
  Elpis = 'Elpis',
  Thule = 'Ultima Thule',
  Other = 'Other',
  None = 'None',
  'Upper La Nosea' = 'Upper La Nocea',
  'Middle La Noscea' = 'Middle La Noscea',
  'Eastern La Noscea' = 'Eastern La Noscea',
  'Lower La Noscea' = 'Lower La Noscea',
  'Western La Noscea' = 'Western La Noscea',
  'Outer La Noscea' = 'Outer La Noscea',
  'Central Shroud' = 'Central Shroud',
  'East Shroud' = 'East Shroud',
  'South Shroud' = 'South Shroud',
  'North Shroud' = 'North Shroud',
  'Western Thanalan' = 'Western Thanalan',
  'Central Thanalan' = 'Central Thanalan',
  'Eastern Thanalan' = 'Eastern Thanalan',
  'Southern Thanalan' = 'Southern Thanalan',
  'Northern Thanalan' = 'Northern Thanalan',
  'Coerthas Central Highlands' = 'Coerthas Central Highlands',
  'Coerthas Western Highlands' = 'Coerthas Western Highlands',
  'Sea of Clouds' = 'Sea of Clouds',
  'Azys La' = 'Azys La',
  'Dravanian Forelands' = 'Dravanian Forelands',
  'Dravanian Hinterlands' = 'Dravanian Hinterlands',
  'The Churning Mists' = 'The Churning Mists',
  'Fringes' = 'Fringes',
  'Peaks' = 'Peaks',
  'Lochs' = 'Lochs',
  'Ruby Sea' = 'Ruby Sea',
  'Yanxia' = 'Yanxia',
  'Azim Steppe' = 'Azim Steppe',
  'Lakeland' = 'Lakeland',
  'Kholusia' = 'Kholusia',
  'Amh Araeng' = 'Amh Araeng',
  'Il Mheg' = 'Il Mheg',
  "Rak'tika" = "Rak'tika",
  'Tempest' = 'Tempest',
  'Mor Dhona' = 'Mor Dhona',
}

export type Material = {
  name: string
  job: GatheringJobs
  location: Locations
  time: string
  recipe?: Recipe
  recipeId?: number
  id?: number
}

export type Quantified<T> = {
  item: T
  qty: number
}

export type Recipe = {
  name: string
  job: GatheringJobs
  materials: Quantified<Material>[]
  materialIds?: { id: number; qty: number }[]
  id?: number
}

export type VariedEvent<T> =
  | SelectChangeEvent<T>
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
