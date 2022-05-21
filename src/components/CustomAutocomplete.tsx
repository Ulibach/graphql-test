import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from 'react';

const filter = createFilterOptions<AutocompleteValue>();

interface AutocompleteValue {
    name: string
    id: number
    click?: boolean
}

interface IProps {
    options: AutocompleteValue[],
    label: string
    onChangeFn?: Function
}


const  CustomAutocomplete: React.FC<IProps> = ({options, label, onChangeFn}) => {
  const [value, setValue] = useState<AutocompleteValue>();

  return (
    <Autocomplete
      value={value}
      onChange={(_, val) => {
          if (label) {
            setValue({name: val?.name ? val.name : '', id: val?.id ? val.id : 0});
          }
          if (onChangeFn) onChangeFn(val?.name)
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const isExisting = options.some(o => params.inputValue === o.name);
        if (params.inputValue !== '' && !isExisting) {
          filtered.push({
            name: `Add "${params.inputValue}"`,
            id: 0,
            click: true
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.name) {
          return option.name;
        }
        return ''
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: '100%', marginBottom: '30px' }}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    />
  );
}

export default CustomAutocomplete