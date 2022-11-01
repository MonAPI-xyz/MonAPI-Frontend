import { h, Fragment } from 'preact';
import { FormControl, FormErrorMessage, Grid, GridItem } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';

import style from './style.css';

const KeyValueInput = (props) => {
  const { id,  errors, rules, register, defaultValue, isValueExists } = props;

  return (
    <Grid h='full' templateColumns={ isValueExists ? 'repeat(8, 1fr)' : '' } gap="20px">
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors && errors['key']}>
              <Input
                  bgColor='#F1F1F1'
                  borderRadius={10}
                  defaultValue={defaultValue}
                  placeholder='Key'
                  className={style['key-value-input']}
                  name={`${id}.key`}
                  {...register(`${id}.key`, rules)}
              />
              <FormErrorMessage>{errors && errors[`key`] && errors[`key`].message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        { isValueExists ? 
          (<GridItem colSpan={5}>
              <FormControl isInvalid={errors && errors['key']}>
                <Input
                    bgColor='#F1F1F1'
                    borderRadius={10}
                    defaultValue={defaultValue}
                    placeholder='Value'
                    className={style['key-value-input']}
                    name={`${id}.value`}
                    {...register(`${id}.value`, rules)}
                />
                <FormErrorMessage>{errors && errors[`value`] && errors[`value`].message}</FormErrorMessage>
              </FormControl>
          </GridItem>)
          :
          (<></>) }
    </Grid>
  );
  
}

export default KeyValueInput;