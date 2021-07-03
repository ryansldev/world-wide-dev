import Image from "next/image";
import { StyledHeader } from "./styles";

import LogoPNG from "../../assets/logo.png";

export function Header() {
  return (
    <StyledHeader>
      <div>
        <Image src={LogoPNG} alt="World wide dev" />
      </div>
    </StyledHeader>
  );
}
