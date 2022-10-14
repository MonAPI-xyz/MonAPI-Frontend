import { h } from 'preact';
import { Button, Text,Box, Grid, GridItem  } from '@chakra-ui/react';
import { useState } from 'preact/hooks';
import KeyValueInput from '../../forms/keyValueInput';

const KeyValueForm = (props) => {
    const { errors, register, } = props;
    const [keyValueInput, setKeyValueInput] = useState([<KeyValueInput
        key="0"
        id="request-url"
        title='Request URL' 
        placeholder='' 
        mb="12px"
        errors={errors}
        rules={{
            required: 'Required',
            minLength: { value: 1, message: 'Required' },
        }}
        register={register}
    />])

    const onClickAddButton = () => {
        
        setKeyValueInput([...keyValueInput, <KeyValueInput
                    key={keyValueInput.length}
                    id={`request-url-${keyValueInput.length}`}
                    title='Request URL' 
                    mb="12px"
                    placeholder='' 
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
            <Grid w='full' h='full' templateColumns='repeat(8, 1fr)' gap="20px">
                <GridItem colSpan={3}>
                    <Text>
                        Query Params
                    </Text>
                </GridItem>

                <GridItem colSpan={5}>
                    <Text>
                        Headers
                    </Text>
                </GridItem>
            </Grid>

            <Box mb='6px' />
            
            {/* {[<Box mb='5px' bgColor="red" w="100px" h="50px" />, 
            <Box mb='5px' bgColor="red" w="100px" h="50px" />
            ].} */}
            {/* {keyValueInput.forEach((element) => {
                console.log("ELEMM" , element)
                return element;
            })} */}

            {keyValueInput.map((element) => {
                return element;
            })}
            
            <Box mb='12px' />
            <Button onClick={onClickAddButton} form="add" colorScheme='teal' type='submit' width='4em' borderRadius={10}>
                Add
            </Button>

        </Box>
    );
}

export default KeyValueForm;