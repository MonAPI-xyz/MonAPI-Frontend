import { h } from 'preact';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import Asterisk from '../asterisk/index.js';
import { Select } from '@chakra-ui/react';

const Dropdown = (props) => {
  const { id, errors, rules, register, title, hasAsterisk = true, placeholder, options, dataTestId, isCategory = false, ...rest } = props;

  return (
    <FormControl {...rest} isInvalid={errors[id]}>
      <FormLabel htmlFor={id}  fontWeight='semibold'>
        {title} {hasAsterisk && <Asterisk isRequired={rules?.['required']} />}
      </FormLabel>
    
        <Select 
            bgColor='#F1F1F1'
            data-testid={dataTestId}
            name={id}
            {...register(id)}
        >
            {isCategory ? options.map((item) => ( 
              <option key={item.id} value={item.id}>
                  {item.name}
              </option>
             )) : options.map(({ key, value }) => (
                <option key={key} value={key}>
                  {value}
                </option>
            ))}
        </Select>
      
    </FormControl>
  );
}

export default Dropdown;