import { h } from 'preact';
import { FormControl, FormLabel, FormErrorMessage, Box, InputGroup, InputLeftElement, Icon, Flex } from '@chakra-ui/react';
import { useController } from "react-hook-form";
import { FiFile } from 'react-icons/fi'
import { Input } from '@chakra-ui/input';
import { useRef, useState } from 'preact/hooks';
import Asterisk from '../asterisk';
import logo from '../../../assets/icons/logo-monapi.svg';

const FileInput = (props) => {
  const { id, errors, rules, accept, w, multiple, title, control,
          placeholder, textChange, hasLabel = true } = props;

  const [img, setImg] = useState(logo)

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      onChange(e.target.files[0])
      setImg(URL.createObjectURL(e.target.files[0]))
    }
  }

  const inputRef = useRef()
  const {
    field: { ref, onChange, value, ...inputProps },
  } = useController({
    name: id,
    control,
    rules,
  });
  return (
      <Box>
        <FormControl isInvalid={errors[id]}>
          {hasLabel && <FormLabel htmlFor={id} fontWeight='semibold'>
            {title} <Asterisk isRequired={rules?.['required']} />
          </FormLabel>}
          <Flex direction='row' gap='50px' align='center'>
            <img src={img} alt="img" style={{ width: "200px", height: "200px" }}/>
            <Flex direction='column' gap='15px'>
              <p><b>Selected:</b><br/>{value && value.name || '-'}</p>
              <Box minW={w}>
                <InputGroup>
                  <InputLeftElement pointerEvents="pointer">
                    <Icon as={FiFile} />
                  </InputLeftElement>

                  <input
                    placeholder={placeholder}
                    onChange={(e) => handleChangeImage(e)}
                    type='file' 
                    accept={accept} 
                    multiple={multiple || false}
                    name={id} 
                    ref={inputRef}
                    {...inputProps} 
                    inputRef={ref} 
                    style={{ display: 'none' }}
                  />
                  
                  <Input
                    onClick={() => inputRef.current.click()}
                    readOnly={true}
                    bgColor='#F1F1F1'
                    cursor="pointer"
                    value={value ? textChange : placeholder}
                    id={id}
                  ></Input>
                </InputGroup>
              </Box>
            </Flex>
          </Flex>
          
          <Box mb='10px' />
          <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
        </FormControl>
      </Box>
  );
  
}

export default FileInput;