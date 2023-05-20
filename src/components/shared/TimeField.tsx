import { Checkbox, InputAdornment, TextField, Typography } from "@mui/material";
import { VariedEvent } from "../types";
import { useBoolean } from "../../hooks/useBoolean";

export function TimeField({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: VariedEvent<string>) => void;
}) {
  const [isTimed, isTimedNode] = useBoolean(false);
  const handleChange = (event: VariedEvent<string>) => {
    const numVal = parseInt(event.target.value, 10);
    if (numVal < 1 || numVal > 12) return;
    if (`${numVal}` !== event.target.value) return;
    onChange(event);
  };
  return (
    <div style={{ width: "100%" }}>
      <Typography>
        Is Timed? <Checkbox checked={isTimed} onChange={isTimedNode.toggle} />
      </Typography>
      {isTimed && (
        <TextField
          type="number"
          label="Time"
          name="time"
          value={value}
          defaultValue={1}
          onChange={handleChange}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">am/pm</InputAdornment>,
          }}
        />
      )}
    </div>
  );
}
