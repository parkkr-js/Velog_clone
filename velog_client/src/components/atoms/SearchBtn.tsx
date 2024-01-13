import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

const SearchBtn = () => {
  return (
    <IconButton>
      <CustomSearchIcon />
    </IconButton>
  );
};

export default SearchBtn;

const CustomSearchIcon = styled(SearchIcon)`
  color: white;
  font-size: 30px;
`;