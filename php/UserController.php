<?php

 class UserController
 {
 
   function data_input($data) {
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
         if (!empty($_POST["id"]) && is_numeric($_POST["id"])) {
           $id = $_POST["id"];
         } else {
           $id = 'ID is not number';
           return json_encode($id);
         }
         
         if (!empty($_POST["value"]) && is_numeric($_POST["value"])) {
           $value = $_POST["value"];
         } else {
           $value = 'Value is not string';
           return json_encode($value);
         }
       }
   }
}

