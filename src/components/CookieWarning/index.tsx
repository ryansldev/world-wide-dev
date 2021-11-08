import { Card, CardContainer, Button } from './styles';

export function CookieWarning() {
  return (
    <Card>
      <CardContainer>
        <span>This website uses cookies to ensure you get the best experience on our website.</span>
        <Button>Got it!</Button>
      </CardContainer>
    </Card>
  )
}
