export default async function Close(req: any, res: any) {
  // Obtén los datos de inicio de sesión del cuerpo de la solicitud
  const { email, password } = req.body;

  // Realiza la lógica de inicio de sesión y obtén el resultado
  console.log(req);
  console.log(email, password);
  const response = await fetch("https://1c8a-82-215-107-1.ngrok-free.app");

  const dataResponse = await response.json();
  console.log(dataResponse);

  // Cierra la web Next.js y devuelve el JSON de respuesta
  res.json(response);
}
