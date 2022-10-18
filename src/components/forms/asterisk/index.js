import { h, Fragment } from 'preact';
import { Box } from "@chakra-ui/react";

const Asterisk = ({isRequired}) => {
    return isRequired ? (
        <Box as='span' color='red.500'>
          *
        </Box>
      ) : (
        <Fragment />
      );
}
export default Asterisk;