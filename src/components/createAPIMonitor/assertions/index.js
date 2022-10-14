import { h } from 'preact';
import { Box, Checkbox } from '@chakra-ui/react';
import TextArea from '../../forms/textArea';
import ExcludeKeys from './excludeKeys';

const Assertions = (props) => {
  const { errors, register } = props;

  return (
    <Box>
        <Checkbox defaultChecked >Assert JSON schema (key) only</Checkbox>
        <Box mb="20px" />
        <TextArea
            id="textAreaAssertion"
            title='' 
            placeholder='' 
            dataTestId='textAreaAssertion'
            errors={errors}
            rules={{
                required: '',
                minLength: { value: 1, message: 'Required' },
            }}
            register={register}
        />
        <Box mb="30px" />
        <ExcludeKeys
          errors={errors}
          register={register}
         />

    </Box>
  );
  
}

export default Assertions;