import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CardContent = styled.div`
  padding: 1rem;
`;
