import styled from "@emotion/styled";
import { BookCard } from "../components";

export const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 1500px) {
    margin: auto 10rem;
  }
`;

export const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: start;
  -webkit-padding-start: 0px;

  @media (max-width: 512px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledList = styled.li`
  justify-self: center;
  &:hover {
    transform: scale(1.05) translateY(-10px);
  }
`;

export const StyledSpan = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const BookCardWrapper = styled.div`
  & p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface BookCardProps {
  src: string;
  title: string;
  size: number;
  onClick: () => void;
}

export const BookCardTest = styled(BookCard)<BookCardProps>`
  border: 1px solid red;
`;
