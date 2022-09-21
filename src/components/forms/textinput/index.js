import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import Asterisk from '../asterisk';

const TextInput = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, ...rest } = props;

  return (
    <FormControl {...rest} isInvalid={errors[id]}>
      <FormLabel htmlFor={id}>
        {title} <Asterisk isRequired={rules?.['required']} />
      </FormLabel>
      <Input
        bgColor='#F1F1F1'
        borderRadius={10}
        defaultValue={defaultValue}
        id={id}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
    </FormControl>
  );
  
}

export default TextInput;