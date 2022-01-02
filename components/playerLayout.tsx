import { Box } from "@chakra-ui/layout";

/*
Rems and Ems -> typically the way to go when making something responsive, along
with some media queries. They are relative units based on font size.

Em: global font sizes (great for layouts)
Rem: closest parent font size (great for components)
*/

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        sidebar
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
