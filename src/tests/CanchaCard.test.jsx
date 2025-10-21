import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CanchaCard from "../components/CanchaCard";
import { CarritoContext } from "../context/CarritoContext";
import { MemoryRouter } from "react-router-dom";

describe("CanchaCard", () => {
  const canchaMock = {
    id: 1,
    nombre: "Cancha Test",
    imagen: "test.jpg",
    precioHora: 5000,
    "Tipo de Superficie": "Cesped",
  };

  it("muestra correctamente la información de la cancha", () => {
    render(
      <CarritoContext.Provider value={{ agregarCancha: jest.fn() }}>
        <MemoryRouter>
          <CanchaCard cancha={canchaMock} />
        </MemoryRouter>
      </CarritoContext.Provider>
    );

    // Verifica texto
    expect(screen.getByText("Cancha Test")).toBeInTheDocument();
    expect(screen.getByText("Superficie: Cesped")).toBeInTheDocument();
    expect(screen.getByText("Precio: $5,000 / hora")).toBeInTheDocument();

    // Verifica imagen
    const img = screen.getByRole("img", { name: /cancha test/i });
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Cancha Test");
  });

  it("llama a agregarCancha al hacer click en Reservar", async () => {
    const agregarCanchaMock = jest.fn();
    render(
      <CarritoContext.Provider value={{ agregarCancha: agregarCanchaMock }}>
        <MemoryRouter>
          <CanchaCard cancha={canchaMock} />
        </MemoryRouter>
      </CarritoContext.Provider>
    );

    const user = userEvent.setup();
    const reservarBtn = screen.getByText("Reservar");
    await user.click(reservarBtn);

    expect(agregarCanchaMock).toHaveBeenCalledTimes(1);
    expect(agregarCanchaMock).toHaveBeenCalledWith(canchaMock);
  });
});
