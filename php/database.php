<?php

class DBConnection 
{
    public static function Connection($host,$username,$password) {
        $conn = new mysqli($host, $username, $password);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        echo "Connected successfully";
    }
    
}
class ConversionHelper {

    static function helpThis() {
       // code
       echo 'Helpthis';
    }
 
    static function helpThat() {
       // code
       echo 'Helpthats';
    }
}

?>