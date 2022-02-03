import { useCallback } from "react";
import BigInput from "../BigInput";

interface IAdminAuthorizationProps {
  authorize: () => void;
}

export default function AdminAuthorization({
  authorize,
}: IAdminAuthorizationProps) {
  const handlePassword = useCallback(
    (event) => {
      if (event.target.value === "senhasecreta") authorize();
    },
    [authorize]
  );

  return (
    <div className="container">
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
        }
      `}</style>
      <BigInput onChange={handlePassword} type="password" />
    </div>
  );
}
