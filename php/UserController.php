<?php

use Application\Model\User;

class BaseController{
  function validateInputs($type, $valueToCheck){
    // print_r($type);
    // print($valueToCheck);
    if(empty($valueToCheck)){
      return FALSE;
    }

    switch($type){
      case "numeric":
        if (is_numeric($valueToCheck))
          return TRUE;
        break;

      case "str":
        if (is_string($valueToCheck))
           return TRUE;
        break;

      default:
       return FALSE;
    }

    return FALSE;
  }
}


 class UserController extends BaseController
 {
   function data_input() {
    //  print_r($_POST);
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $inputData = [];

         if ($this->validateInputs('numeric', $_POST["id"])){
           $inputData['id'] =  $_POST["id"];
         }else {
           return 'ID is not number';
         }

         if ($this->validateInputs('str', $_POST["value"])){
          $inputData['value'] =  $_POST["value"];
        }else {
          return 'Value is not string';
        }
        
        return json_encode(($inputData));
       }
   }
}

print_r(is_numeric("test"));

// print_r($_POST);
$usc = new UserController();
print_r($usc->data_input());