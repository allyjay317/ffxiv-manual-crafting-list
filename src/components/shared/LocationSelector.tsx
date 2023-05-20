import { InputLabel, SelectChangeEvent } from "@mui/material";
import { Locations } from "../types";
import { SelectContainer, SelectLabel, SelectWithLabel } from "./styles";
import { LOCATIONS } from "../../constants";
import { Select } from "../Select/Select";

const id = "location-label";

export function LocationSelector({
  value,
  onChange,
}: {
  value: Locations;
  onChange: (event: SelectChangeEvent<Locations>) => void;
}) {
  return (
    <div style={SelectContainer}>
      <InputLabel sx={SelectLabel} id={id}>
        Location
      </InputLabel>

      <Select
        labelId={id}
        name="location"
        label="Location"
        value={value}
        onChange={onChange}
        sx={SelectWithLabel}
        options={LOCATIONS}
      />
    </div>
  );
}
