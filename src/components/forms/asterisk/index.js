import { h, Fragment } from 'preact';
import { Box } from "@chakra-ui/layout";

const Asterisk = ({isRequired}) => {
    return isRequired ? (
        <Box as='span' color='red.500'>
          *
        </Box>
      ) : (
        <Fragment/>
      );
}
export default Asterisk;