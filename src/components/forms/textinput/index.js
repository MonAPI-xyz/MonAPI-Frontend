import { h } from 'preact';
import { FormControl, FormLabel, FormErrorMessage, Box } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import Asterisk from '../asterisk';

const TextInput = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, hasLabel = true, mb, w, testId, ...rest } = props;

  return (
    <Box w={w}>
      <FormControl {...rest} isInvalid={errors[id]} mb={mb}>
        {hasLabel && <FormLabel htmlFor={id} fontWeight='semibold'>
          {title} <Asterisk isRequired={rules?.['required']} />
        </FormLabel>}
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
    </Box>
  );
  
}

export default TextInput;