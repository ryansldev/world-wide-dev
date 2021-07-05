import Link from "next/link";
import Image from "next/image";
import { StyledHeader } from "./styles";

import LogoPNG from "../../assets/logo.png";

export function Header() {
  return (
    <StyledHeader>
      <div>
        <Link href="/" passHref>
          <a>
            <Image src={LogoPNG} alt="World wide dev" />
          </a>
        </Link>
      </div>
    </StyledHeader>
  );
}
