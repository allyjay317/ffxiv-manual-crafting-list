import { Button, Typography } from "@mui/material";
import { Material, VariedEvent } from "../../types";
import { NameField } from "../../shared/NameField";
import { JobSelector } from "../../shared/JobSelector";
import { LocationSelector } from "../../shared/LocationSelector";
import { TimeField } from "../../shared/TimeField";
import { useState } from "react";
import { ModalHeader } from "../ModalHeader";

export function MaterialEditor({
  material,
  onSubmit,
  handleChange,
  title,
}: {
  material: Material;
  onSubmit: () => void;
  handleChange: (material: Material) => void;
  title: string;
}) {
  const [validationError, setValidationError] = useState("");

  const onChange = <T,>(e: VariedEvent<T>) => {
    handleChange({
      ...material,
      [e.target.name]: e.target.value as T,
    });
  };

  return (
    <>
      <ModalHeader label={title} />
      <NameField
        value={material.name}
        onChange={onChange}
        setValidationError={setValidationError}
      />
      <JobSelector value={material.job} onChange={onChange} />
      <LocationSelector value={material.location} onChange={onChange} />
      <TimeField value={material.time} onChange={onChange} />
      <Typography sx={{ color: "red" }}>{validationError}</Typography>
      <Button onClick={onSubmit} disabled={!!validationError}>
        Submit
      </Button>
    </>
  );
}
