import { StyledFooter, StyledDiscordCommunity, Diviser } from './styles';
import { FaDiscord } from 'react-icons/fa';

export function Footer() {
  return (
    <StyledFooter>
      <StyledDiscordCommunity href="https://discord.gg/7QU93fUHun" target="_blank" rel="noopener noreferrer">
        <FaDiscord size={64} />
        <span>Join in us community<br /> <strong>on Discord</strong></span>
      </StyledDiscordCommunity>
      <Diviser />
      <span>Developed by <a href="https://github.com/EddyPBR" target="_blank" rel="noopener noreferrer">Edvaldo Junior</a> and <a href="https://github.com/ryansldev" target="_blank" rel="noopener noreferrer">Ryan Lima</a></span>
    </StyledFooter>
  )
}
