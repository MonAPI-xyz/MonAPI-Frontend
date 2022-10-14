import { h } from 'preact';
import { FormControl, FormLabel, FormErrorMessage, Textarea } from '@chakra-ui/react';
import Asterisk from '../asterisk';

const TextArea = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, dataTestId, ...rest } = props;

  return (
    <FormControl {...rest} isInvalid={errors[id]}>
      <FormLabel htmlFor={id} fontWeight='semibold'>
        {title} <Asterisk isRequired={rules?.['required']} />
      </FormLabel>
     
      <Textarea
        defaultValue={defaultValue}
        data-testid={dataTestId}
        id={id}
        minHeight="200px"
        placeholder={placeholder}
        bgColor="#F1F1F1"
        {...register(id, rules)}
      />
      <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
    </FormControl>
  );
  
}

export default TextArea;