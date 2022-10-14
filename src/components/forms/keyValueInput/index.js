import { h } from 'preact';
import { FormControl, FormErrorMessage, Grid, GridItem } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';

const KeyValueInput = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, mb, ...rest } = props;

  return (
    <FormControl {...rest} isInvalid={errors[id]} mb={mb}>
      <Grid w='full' h='full' templateColumns='repeat(8, 1fr)' gap="20px">
            <GridItem colSpan={3}>
                <Input
                    bgColor='#F1F1F1'
                    borderRadius={10}
                    defaultValue={defaultValue}
                    placeholder='Key'
                    {...register(id, rules)}
                />
            </GridItem>

            <GridItem colSpan={5}>
                <Input
                    bgColor='#F1F1F1'
                    borderRadius={10}
                    defaultValue={defaultValue}
                    placeholder='Value'
                    {...register(id, rules)}
                />
            </GridItem>
      </Grid>
      <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
    </FormControl>
  );
  
}

export default KeyValueInput;