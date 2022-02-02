import React from "react";

interface IUserMenuProps {
  username?: string | null;
  logout?: () => void;
}

export default function UserMenu({ username, logout }: IUserMenuProps) {
  if (!username) return null;
  return (
    <div className="usernameContainer">
      <style jsx>{`
        .usernameContainer {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 1rem;
        }

        .usernameContainer button {
          font-size: 1rem;
          background: none;
          border: none;
          padding: 0;
          color: var(--primary-color-light);
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
      {username} {logout && <button onClick={logout}>(sair)</button>}
    </div>
  );
}
