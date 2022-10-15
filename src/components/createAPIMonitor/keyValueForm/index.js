import { h } from 'preact';
import { Button, Box } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useFieldArray } from 'react-hook-form';

import KeyValueInput from '../../forms/keyValueInput';
import style from './style.css';


const KeyValueForm = ({ errors, register, keyName, control, buttonAddText }) => {
    const {fields, append, remove} = useFieldArray({ control, name: keyName });

    return (
        <Box>
            {fields.map((_, index) => (
                <div key={`${keyName}[${index}]`} class={style['key-value-wrapper']}>
                    <KeyValueInput
                        key={`${keyName}[${index}]`}
                        id={`${keyName}[${index}]`}
                        mb="12px"
                        errors={errors[keyName] && errors[keyName][index]}
                        rules={{
                            required: 'Required',
                            minLength: { value: 1, message: 'Required' },
                        }}
                        register={register}
                    />
                    <div class={style['key-value-close-icon']} onClick={()=>{remove(index)}} data-testid={'keyValueRemoveButton'}>
                        <CloseIcon  />
                    </div>
                </div>
            ))}
            
            <Box mb='12px' />
            <Button onClick={()=>{append({key: '', value: ''})}} form="add" colorScheme='teal' type='submit' width='auto' borderRadius={10}>
                {buttonAddText}
            </Button>

        </Box>
    );
}

export default KeyValueForm;