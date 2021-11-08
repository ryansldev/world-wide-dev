import { useEffect, useState } from 'react';
import { Card, CardContainer, Button } from './styles';

export function CookieWarning() {
  function handleAgree() {
    localStorage.setItem('CookieAgree', 'Yes');
    setCookieAgree(true);
  }

  const [cookieAgree, setCookieAgree] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('CookieAgree') === 'Yes') {
      setCookieAgree(true);
    }
  }, []);

  return (
    <>
      { !cookieAgree &&
        <Card>
          <CardContainer>
            <span>This website uses cookies to ensure you get the best experience on our website.</span>
            <Button onClick={handleAgree}>Got it!</Button>
          </CardContainer>
        </Card>
      }
    </>
  )
}
