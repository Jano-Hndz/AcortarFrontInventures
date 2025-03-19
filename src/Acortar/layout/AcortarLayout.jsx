import { Container, useTheme } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar,Footer } from '../components';

export const AcortarLayout = ({ children, maxWidth, innerStyle }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar/>
      <Box display='flex' flex={1} sx={{background: `linear-gradient(white, ${theme.palette.grey[200]})`}}>
        <Container
          flex={1}
          disableGutters
          maxWidth={maxWidth}
          sx={{...innerStyle, display:'flex', flexDirection: 'column'}}
        >
          { children }
        </Container>
      </Box>
      <Box flexShrink={0}>
        <Footer />
      </Box>
    </Box>
  )
}
