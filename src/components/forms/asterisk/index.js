import { Box } from "@chakra-ui/layout";

const Asterisk = ({isRequired}) => {
    return isRequired ? (
        <Box as='span' color='red.500'>
          *
        </Box>
      ) : (
        <></>
      );
}
export default Asterisk;