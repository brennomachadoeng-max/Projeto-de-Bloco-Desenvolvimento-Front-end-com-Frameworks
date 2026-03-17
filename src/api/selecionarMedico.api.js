export function buscarMedicos(setMedicos, setCarregando) {
    fetch("https://randomuser.me/api/?results=10&nat=br")
      .then((response) => response.json())
      .then((data) => {
        const medicosFormatados = data.results.map((user, index) => ({
          id: user.login.uuid,
          nome: `${user.name.first} ${user.name.last}`,
          foto: user.picture.medium,
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

//Caso a api nao esteja funcionando, pode usar os dados locais abaixo para teste.
/*
export function buscarMedicos(setMedicos, setCarregando) {
  // Simula um atraso de rede
  setTimeout(() => {
    const dadosLocais = [
      { id: 1, nome: "Dr. Brenno Machado", foto: "https://avatar.iran.liara.run/public/1", especialidade: "Psicólogo Clínico" },
      { id: 2, nome: "Dra. Maria Silva", foto: "https://avatar.iran.liara.run/public/50", especialidade: "Psiquiatra" }
    ];
    setMedicos(dadosLocais);
    setCarregando(false);
  }, 500); 
}*/