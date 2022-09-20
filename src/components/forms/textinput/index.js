import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import Asterisk from '../asterisk';

const TextInput = (props) => {
  const { id, errors, isRequired, register, title, placeholder, defaultValue, ...rest } = props;

  return (
    <FormControl {...rest} isInvalid={errors}>
      <FormLabel htmlFor={id}>
        {title} <Asterisk isRequired={isRequired} />
      </FormLabel>
      <Input
      bgColor='#F1F1F1'
        defaultValue={defaultValue}
        id={id}
        placeholder={placeholder}
        
      />
      <FormErrorMessage>{errors}</FormErrorMessage>
    </FormControl>
  );
  
}

export default TextInput;