import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import {  useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import Asterisk from '../asterisk/index.js';

const PasswordInput = (props) => {
  const { id, errors, isRequired, register, title, placeholder, ...rest } = props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel htmlFor={id}>
        {title} <Asterisk isRequired={isRequired} />
      </FormLabel>
    
        <InputGroup size='md'>
        <Input
            type={show ? 'text' : 'password'}
            id={id}
            bgColor='#F1F1F1'
            placeholder={placeholder}
            borderRadius={10}

            // {...register(id, rules)}
          />
          <InputRightElement mr={3}>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              <Icon h={4} w={4} as={show ? BsFillEyeFill : BsFillEyeSlashFill} />
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors}</FormErrorMessage>
      
    </FormControl>
  );
}

export default PasswordInput;