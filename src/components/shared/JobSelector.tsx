import { InputLabel, MenuItem, SelectChangeEvent } from "@mui/material";
import { GatheringJobs } from "../types";
import { SelectContainer, SelectLabel, SelectWithLabel } from "./styles";
import { JOBS } from "../../constants";
import { Select } from "../Select/Select";

const id = "job-label";

export function JobSelector({
  value,
  onChange,
}: {
  value: GatheringJobs;
  onChange: (event: SelectChangeEvent<GatheringJobs>) => void;
}) {
  return (
    <div style={SelectContainer}>
      <InputLabel sx={SelectLabel} id={id}>
        Required Job
      </InputLabel>
      <Select
        sx={SelectWithLabel}
        labelId={id}
        name="job"
        label="Job"
        value={value}
        onChange={onChange}
        options={JOBS}
      />
    </div>
  );
}
