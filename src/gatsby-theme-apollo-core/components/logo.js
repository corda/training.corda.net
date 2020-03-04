import React from 'react';
import styled from '@emotion/styled';
//import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';

const Wrapper = styled.div({
  display: 'flex'
});

export default function Logo() {
  return (
    <Wrapper>
      <img src={'/corda.png'} alt="Corda" height="32" />
    </Wrapper>
  );
}

