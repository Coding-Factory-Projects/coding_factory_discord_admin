export function buildErrorObjectFromStatus(httpStatus: number): { title: string, message: string } {
  if (httpStatus === 401) {
    return {
      title: "Non autorisé",
      message: "Veuillez vérifier l'adresse email et le mot de passe entré !"
    }
  }

  return {
    title: "Internal server error",
    message: "Une erreur s'est produite au niveau du serveur, veuillez réessayer plus tard !"
  }
}