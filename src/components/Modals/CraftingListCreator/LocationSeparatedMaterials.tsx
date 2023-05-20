import { useMemo } from "react";
import { Material, Quantified } from "../../types";
import { Typography } from "@mui/material";
import { MaterialList } from "../../Views/Material/MaterialList";

export function LocationSeparatedMaterials({
  materials,
}: {
  materials: Quantified<Material>[];
}) {
  const locations: Record<string, Quantified<Material>[]> = useMemo(() => {
    const tempLocations: Record<string, Quantified<Material>[]> = {};

    materials.forEach((mat) => {
      const loc = mat.item.location;
      const existing = tempLocations[loc] ?? [];

      tempLocations[loc] = [...existing, mat];
    });

    return tempLocations;
  }, [materials]);

  return (
    <div>
      {Object.entries(locations).map(([location, mats]) => {
        return (
          <div key={location}>
            <Typography>{location}</Typography>
            <MaterialList recipeMaterials={mats} />
          </div>
        );
      })}
    </div>
  );
}
