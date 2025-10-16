<?php 
include_once("server.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if(isset($_POST['name'])) {
    $nome = strtoupper($_POST['name']); 
    $presenca = strtoupper($_POST['presence']);
    
    // Verifica se o convidado já existe
    $stmt = $conn->prepare("SELECT presenca FROM convidados WHERE nome = ?");
    $stmt->bind_param("s", $nome);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // Se a presença mudou, atualizar o registro
        if ($row['presenca'] !== $presenca) {
            $stmt = $conn->prepare("UPDATE convidados SET presenca = ? WHERE nome = ?");
            $stmt->bind_param("ss", $presenca, $nome);
            
            if ($stmt->execute()) {
                $response['message'] = 'Presença atualizada para ' . $presenca . '.';
            } else {
                $response['error'] = 'Erro ao atualizar a presença. Tente novamente.';
            }
        } else {
            $response['error'] = 'Sua resposta já foi registrada.';
        }
    } else {
        // Se o convidado não existe, insere um novo registro
        $stmt = $conn->prepare("INSERT INTO convidados (nome, presenca) VALUES (?, ?)");
        $stmt->bind_param("ss", $nome, $presenca);
        
        if ($stmt->execute()) {
            $response['message'] = 'Resposta registrada com sucesso!';
        } else {
            $response['error'] = 'Algo deu errado. Tente novamente.';
        }
    }

    echo json_encode($response);
    
    $stmt->close();
}

$conn->close();
?>