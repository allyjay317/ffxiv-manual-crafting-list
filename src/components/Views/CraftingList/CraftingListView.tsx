import { LocationSeparatedMaterials } from "../../Modals/CraftingListCreator/LocationSeparatedMaterials";
import { TabCreator } from "../../Tabs/TabCreator";
import { Material, Quantified } from "../../types";
import { MaterialList } from "../Material/MaterialList";

export function CraftingListView({
  craftingList,
}: {
  craftingList: Quantified<Material>[];
}) {
  const tabs = [
    {
      name: "All",
      component: <MaterialList recipeMaterials={craftingList} />,
    },
    {
      name: "Location",
      component: <LocationSeparatedMaterials materials={craftingList} />,
    },
  ];

  return <TabCreator options={tabs} />;
}
