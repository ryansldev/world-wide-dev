import Link from "next/link";
import Image from "next/image";

import Skeleton from "react-loading-skeleton";

import { useAuth } from "../../hooks/useAuth";

import { StyledHeader } from "./styles";
import LogoPNG from "../../assets/logo.png";

export function Header() {
  const { isLoading, githubApiInfo } = useAuth();

  return (
    <StyledHeader>
      <div>
        <Link href="/" passHref>
          <a>
            <Image src={LogoPNG} alt="World wide dev" />
          </a>
        </Link>
        {
          isLoading
          ? <span><Skeleton width={50} height={16} />/<Skeleton width={50} height={16} /></span>
          : <span>{githubApiInfo?.remaining}/{githubApiInfo?.limit}</span> 
        }
      </div>
    </StyledHeader>
  );
}
