import { GatheringJobs, Locations, SelectOption } from './components/types'
import { selectOptionSort } from './utils'

export const defaultMaterial = {
  job: GatheringJobs.Botanist,
  location: Locations.Labyrinthos,
  name: '',
  recipe: undefined,
  time: '',
}

export const JOBS: SelectOption<GatheringJobs>[] = Object.entries(GatheringJobs)
  .map(([label, value]) => ({ label, value }))
  .sort(selectOptionSort)

export const LOCATIONS: SelectOption<Locations>[] = Object.entries(Locations)
  .map(([label, value]) => ({ label, value }))
  .sort(selectOptionSort)
