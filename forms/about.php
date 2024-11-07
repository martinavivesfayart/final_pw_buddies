<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_email = $_POST['email'];  // Correo del usuario que se suscribe
    $from = "buddies@itba.edu.ar";  // Este será el correo remitente
    $subject = "Welcome to Buddies!";
    
    // Cuerpo del mensaje que quieres enviar a los suscriptores
    $message = "Hola! Esperamos que estés muy bien.\n\n";
    $message .= "Te escribimos para contarte un poco más de Buddies.\n\n";
    $message .= "Buddies es una organización estudiantil del ITBA que está para brindarle apoyo a los estudiantes que vienen de intercambio. ";
    $message .= "Los ayudamos a que se adapten al ITBA y a Buenos Aires en general. A partir de la cantidad de alumnos inscriptos y según la cantidad de chicos que lleguen, asignamos a los Buddies. ";
    $message .= "En general hay más argentinos que extranjeros, por lo que no todos tienen un alumno asignado. De igual manera, todos forman parte del grupo y de las actividades que hagamos.\n\n";
    $message .= "¿Qué implica ser Buddy?\n\n";
    $message .= "En primera instancia debes enviarle un mail al estudiante que te hayamos asignado, presentándote y explicándole que estás para responder sus dudas. ";
    $message .= "Probablemente te hagan preguntas que quizás no sepas responder, pero para eso vamos a tener un grupo de WhatsApp solo de argentinos para que entre todos pasemos la información.\n\n";
    $message .= "¿Cómo va a ser la comunicación con los estudiantes y demás Buddies?\n\n";
    $message .= "Como fue mencionado anteriormente, la primera instancia de comunicación es vía mail. Luego vamos a tener un grupo de WhatsApp donde vamos a estar todos, argentinos y extranjeros.\n\n";
    $message .= "Las actividades no son obligatorias pero es divertido sumarse para conocernos entre todos. Formar parte implica un compromiso, pero no les vamos a exigir nada que interfiera con la facultad ya que esa es la prioridad.\n\n";
    $message .= "Puede pasar que no te hagas amig@ de tu Buddy, pero lo que sí pedimos es que al menos una vez al mes se comuniquen de alguna manera para ver si todo va bien en el ITBA y en Buenos Aires en general.\n\n";
    $message .= "Cualquier otra consulta no dudes en escribirnos.\n\n";
    $message .= "Saludos!";

    // Encabezados
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . $from . "\r\n";

    // Validación básica del correo
    if (filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
        // Enviar el correo al usuario suscrito
        if (mail($user_email, $subject, $message, $headers)) {
            echo "Thank you! We’ll be in touch with more information soon.";
        } else {
            echo "There was an error sending your message. Please try again later.";
        }
    } else {
        echo "Please enter a valid email address.";
    }
} else {
    echo "Invalid request method.";
}
?>
