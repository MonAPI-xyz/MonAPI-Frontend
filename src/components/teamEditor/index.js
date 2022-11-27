import { h, Fragment } from "preact";
import { Box } from "@chakra-ui/react";
import FileInput from "../forms/fileInput";
import TextInput from "../forms/textinput";

const TeamEditor = ({errors, register, control, description, logo}) => {
    return (
        <>
            <Box w='40vw'>
            <TextInput
                id="description"
                title='Team Description'
                placeholder='Insert Team Description'
                errors={errors}
                register={register}
                defaultValue={description}
            />
            </Box>
            <Box mb='20px' />
            
            <FileInput
            w='10vw'
            id="logo"
            title='Team Logo'
            errors={errors}
            control={control}
            accept={'image/*'}
            placeholder='Select Image'
            textChange='Change Image'
            register={register}
            description='Maximum file size is 10MB'
            defaultImage={logo}
            rules={{ 
                validate: (file) => {
                    if (file && ((file.size/(1024 * 1024)) > 10)) {
                        return 'Please choose image that the file size less than or equal to 10MB'
                    }
                }
            }}
        />        
        </>
    );
}

export default TeamEditor;