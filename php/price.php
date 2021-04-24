    <?php
    //Let the array of data:
    $data = [
        [
            'id' => 1,
            'price' => 100
        ],
        [
            'id' => 2,
            'price' => 200
        ],
        [
            'id' => 3,
            'price' => 300
        ],
        [
            'id' => 4,
            'price' => 400
        ],
        [
            'id' => 5,
            'price' => 500
        ],
        [
            'id' => 6,
            'price' => 600
        ],
    ];

    function CalculatePrice($data, $input)
    {
        for($i =0; $i < count($data); $i++) {
            if ($data[$i]['price'] >= $input) {
                $row[] = $data[$i];
            }
        }
        return $row;
    };
    // let user input is 400 -- change between 100-600
    $calculatedPrice = CalculatePrice($data, 400);
    echo 'Array greater than input value: <pre>';
     print_r($calculatedPrice);
    echo '<br>';

    function SumOfArrayPrice($data)
    {
        $total = 0;
        foreach($data as $price)
        {
            $total +=  $price['price'];
        }
        return $total;
    }

    $sumofvalues = SumOfArrayPrice($data);
    echo ' Total Sum Value is: '. $sumofvalues;



    ?>

