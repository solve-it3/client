import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../utils/palette';

// Imported Components
import MyButton from '../Common/MyButton';
import { Text } from 'src/@components/atoms/Text';

const SearchBox = () => {
  return (
    <SearchBoxContainer>
      <FontAwesomeIcon
        className="fa-2xl"
        style={{ color: colors.themeGray }}
        icon={faMagnifyingGlass}
      />
      <SocialInput placeholder="스터디명 또는 사용자명을 입력해 주세요." />
      <MyButton width="70px" color={colors.themeRed}>
        <Text
          size="20"
          weight="bold"
          color="#fff"
          font={`'Noto Sans KR', sans-serif;`}
          cursor="inherit"
        >
          검색
        </Text>
      </MyButton>
    </SearchBoxContainer>
  );
};

const SearchBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 0 auto;
  border: 1px solid #babcbe;
  padding-left: 20px;
  padding-right: 20px;
  width: 570px;
  height: 70px;
  border-radius: 10px;

  background-color: ${colors.themeWhite};
`;

const SocialInput = styled.input`
  border: none;
  width: 390px;
  height: 50px;

  text-indent: 10px;
  font-size: 20px;
  line-height: 20px;
  font-family: 'Noto Sans KR', sans-serif;

  outline: none;

  &::placeholder {
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
    color: ${colors.themeGray};
  }
`;

export default SearchBox;
