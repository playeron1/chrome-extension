import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  font-family: Arial, sans-serif;
`;

const Price = styled.span`
  font-weight: bold;
  color: #0070f3;
`;

function Popup() {
  const [amazonPrice, setAmazonPrice] = useState('Loading...');
  const [flipkartPrice, setFlipkartPrice] = useState('Loading...');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['amazon', 'flipkart'], (result) => {
      const amazonData = result.amazon || {};
      const flipkartData = result.flipkart || {};
      setProductName(amazonData.productName || flipkartData.productName || 'Product');
      setAmazonPrice(amazonData.price || 'Not Available');
      setFlipkartPrice(flipkartData.price || 'Not Available');
    });
  }, []);

  return (
    <Container>
      <h3>{productName}</h3>
      <p>Amazon: <Price>{amazonPrice}</Price></p>
      <p>Flipkart: <Price>{flipkartPrice}</Price></p>
    </Container>
  );
}

export default Popup;
