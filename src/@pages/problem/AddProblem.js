import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Card from './Card';

const AddProblem = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cards, setCards] = useState([]);
  const [problemData, setProblemData] = useState({
    problemDetails: null,
    solved: false,
  });

  const addNewCard = (problemInfo) => {
    setCards([...cards, problemInfo]);
  };

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);
  const handleCardCreation = () => {
    if (problemData.problemDetails) {
      addNewCard(problemData);
      setProblemData({ problemDetails: null, solved: false });
      setShowModal(false);
    }
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    setShowModal(false);
    setSearchValue('');
    setProblemData({ problemDetails: null, solved: false });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSearchValue('');
    setProblemData({ problemDetails: null, solved: false });
  };

  const handleSearch = async () => {
    try {
      const BASE_URL = 'http://127.0.0.1:8000';
      const access =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwMjA1NTMwLCJpYXQiOjE2OTE1NjU1MzAsImp0aSI6ImVmODFkOTM5NzY3NDRiYzhhMTkzNWIwZjVmMmE0NGZmIiwidXNlcl9pZCI6MX0.NE-PQyXevNbIfs4_GUPeZ3JnTkbEOOtgaRgYFEk37o0';

      const response = await axios.get(
        `${BASE_URL}/api/problem/뿌수기/${searchValue}/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = response.data;

      if (data.number) {
        const problemInfo = {
          problemId: data.number,
          title: data.name,
          algorithm: data.algorithms || 'No Algorithm',
          solvedMembers: data.solved_members || [],
        };

        if (searchResults.length === 1) {
          setProblemData({ problemDetails: problemInfo, solved: false });
        } else {
          setSearchResults([problemInfo]);
        }
      } else {
        console.error('Problem not found');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <AddButton onClick={handleButtonClick}>문제 추가하기</AddButton>
      {showModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>문제 추가하기</ModalTitle>
            <SearchInputContainer>
              <BsSearch size={17} />
              <SearchInput
                type="text"
                placeholder="백준 문제 번호"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={handleSearch}
              />
              <SearchButton onClick={handleSearch}>추가</SearchButton>
            </SearchInputContainer>
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((result) => (
                  <SearchResult
                    key={result.problemId}
                    onClick={() =>
                      setProblemData({ problemDetails: result, solved: false })
                    }
                  >
                    <ProblemNumber>{result.problemId}</ProblemNumber>
                    <ProblemTitle>{result.title}</ProblemTitle>
                    <ProblemTag>
                      {result.algorithm || 'No Algorithm'}
                    </ProblemTag>
                  </SearchResult>
                ))}
              </SearchResults>
            )}
            <Buttons>
              <SubmitButton onClick={handleCardCreation}>완료</SubmitButton>
              <CloseButton onClick={handleModalClose}>취소</CloseButton>
            </Buttons>
          </ModalContent>
        </Modal>
      )}

      <CardContainer>
        {cards.map((cardData, index) => (
          <Card key={index} problemDetails={cardData} />
        ))}
      </CardContainer>
    </div>
  );
};

export default AddProblem;

const AddButton = styled.button`
  border-radius: 5px;
  background: #f05454;
  color: #fff;
  text-align: center;
  font-family: Apple SD Gothic Neo;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  width: 236px;
  height: 55px;
  flex-shrink: 0;
  display: block;
  margin-top: 65px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background: #e84343;
    /* You can add additional styles for the hover effect here */
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 100; /* Ensure it appears above other elements */
`;

const ModalTitle = styled.div`
  color: #000;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ModalContent = styled.div`
  width: 350px;
  height: 500px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #babcbe;
  background: #fff;
  padding: 5px;
  color: #babcbe;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  margin-top: 50px;
  line-height: normal;
  height: 40px;
  width: 300px;
  svg {
    margin-right: 10px;
    color: #999;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
`;

const SearchButton = styled.button`
  width: 47px;
  height: 25px;
  border-radius: 2px;
  background: #f05454;
  border: none;
  margin-right: 3px;
  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  &:hover {
    background-color: #e84343;
  }
`;

const ProblemDetails = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;

const ProblemNumber = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProblemTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProblemTag = styled.div`
  background-color: #e8f0fe;
  color: #466589;
  padding: 5px;
  border-radius: 4px;
  margin-top: 10px;
  display: inline-block;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const CloseButton = styled.button`
  width: 86px;
  height: 48px;
  border-radius: 5px;
  background: #babcbe;
  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 180px;
  border: none;
  cursor: pointer;
  &:hover {
    background: rgba(217, 217, 217, 0.9);
  }
`;

const SubmitButton = styled.button`
  width: 163px;
  height: 47px;
  border-radius: 5px;
  background: #f05454;
  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  margin-top: 180px;
  cursor: pointer;
  &:hover {
    background: rgba(240, 84, 84, 0.9);
  }
`;

const SearchResults = styled.div`
  margin-top: 10px;
  border: 1px solid #babcbe;
  border-radius: 10px;
  padding: 10px;
  width: 300px;
`;

const SearchResult = styled.div`
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
