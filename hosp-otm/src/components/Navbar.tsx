"use client"; 
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/useContext";
import { useRouter } from "next/navigation";
import { getUserById } from "@/features/user/user.service";
import { User } from "@/features/user/user.interface";

const Navbar: React.FC = () => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se o token está presente no localStorage
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else if (user && user.id) {
      // Caso o usuário esteja autenticado, buscar dados do usuário
      getUserById(user.id)
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário:", error);
        });
    }
  }, [user, router]); // A dependência de `user` garante que o efeito execute quando o `user` mudar

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  // Verificar se o usuário existe antes de exibir a Navbar
  if (!user) {
    return null;
  }

  return (
    <div>
      <nav style={{ backgroundColor: "#2d3748", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "white", fontSize: "24px" }}>Otimizador Hospitalar</div>
          <div style={{ position: "relative" }}>
            <img
              src={userData?.imageUrl || "default-avatar.jpg"}
              alt="User Avatar"
              style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  marginTop: "8px",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  width: "200px",
                  zIndex: 10,
                }}
              >
                <div style={{ padding: "16px" }}>
                  <p style={{ fontSize: "18px", fontWeight: "600" }}>Hello, {userData?.name}</p>
                  <button
                    onClick={() => router.push("/settings")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      color: "#4a5568",
                      padding: "8px 16px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = "#edf2f7"}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = "transparent"}
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      color: "#4a5568",
                      padding: "8px 16px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = "#edf2f7"}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = "transparent"}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}></div>
    </div>
  );
};

export default Navbar;