import { LocationSeparatedMaterials } from '../../Modals/CraftingListCreator/LocationSeparatedMaterials'
import { TabCreator } from '../../Tabs/TabCreator'
import { Material, Quantified } from '../../types'
import { MaterialList } from '../Material/MaterialList'

export function CraftingListView({
  craftingList,
}: {
  craftingList: Quantified<Material>[]
}) {
  const tabs = [
    {
      component: <MaterialList recipeMaterials={craftingList} />,
      name: 'All',
    },
    {
      component: <LocationSeparatedMaterials materials={craftingList} />,
      name: 'Location',
    },
  ]

  return <TabCreator options={tabs} />
}
