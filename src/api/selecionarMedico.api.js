export function buscarMedicos(setMedicos, setCarregando) {
    fetch("https://randomuser.me/api/?results=10&nat=br")
      .then((response) => response.json())
      .then((data) => {
        const medicosFormatados = data.results.map((user, index) => ({
          id: user.login.uuid,
          nome: `${user.name.first} ${user.name.last}`,
          foto: user.picture.medium, // Guardamos a URL da foto
          especialidade: index % 2 === 0 ? "Psicólogo Clínico" : "Psiquiatra"
        }));
        
        setMedicos(medicosFormatados);
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro ao buscar médicos:", err);
        setCarregando(false);
      });
}