import LogoutButton from "./components/logout"

export default function HomeUser() {
    return(
        <div>
            <h1 className="text-2xl font-bold text-center mt-10">Bienvenido al Panel de Empleado</h1>
            <LogoutButton />
        </div>
    )
}