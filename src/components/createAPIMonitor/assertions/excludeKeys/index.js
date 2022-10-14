import { h } from 'preact';
import { Box, Button} from '@chakra-ui/react';
import { useState } from 'preact/hooks';
import TextInput from '../../../forms/textinput';

const ExcludeKeys = (props) => {
  const { errors, register } = props;

  const [excludeKey, setExcludeKey] = useState([<TextInput
    key="0"
    id="eclude-key"
    title='Exclude keys' 
    placeholder='Key' 
    w="22vw"
    mb="12px"
    errors={errors}
    rules={{
        required: 'Required',
        minLength: { value: 1, message: 'Required' },
    }}
    register={register}
/>])

const onClickAddButton = () => {
    
    setExcludeKey([...excludeKey, <TextInput
                key={excludeKey.length}
                id={`eclude-key-${excludeKey.length}`}
                hasLabel={false}
                mb="12px"
                w="22vw"
                placeholder='Key' 
                errors={errors}
                rules={{
                    required: 'Required',
                    minLength: { value: 1, message: 'Required' },
                }}
                register={register}
            />])
}

  return (
    <Box>
        {excludeKey.map((element) => {
            return element;
        })}
        
        <Box mb='12px' />
        <Button onClick={onClickAddButton} form="add" colorScheme='teal' type='submit' width='4em' borderRadius={10}>
            Add
        </Button>

    </Box>
  );
  
}

export default ExcludeKeys;