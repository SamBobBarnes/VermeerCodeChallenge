<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vermeer Code Challenge: Github Search</title>
    <script src="https://unpkg.com/vue@3.0.5"></script>
    <link href="index.css" rel="stylesheet">
</head>
<body>
    <h1>Vermeer Code Challenge: Github Search</h1>

    <div id="app">

            <input @input="searchInputHandler" @keyup.enter.native="submit" id="searchbox" />
            <button @click="submit">Search</button>

            <p v-if="this.total > 0" id="total">{{ total }} results</p>
            <p v-if="notexterr" class="err">Please Enter Some Text</p>
            <table>
                <tr v-for="item in result" class="itemrow">
                    <td class="itemcell">{{ item.login }}</td>
                </tr>
            </table>

    </div>




    <?php
        error_reporting( error_reporting() & ~E_NOTICE );
        $q = $_GET['q'];
        $m = $_GET['m'];
        $p = $_GET['p'];
    ?>
    <script>
        if("<?php Print($q); ?>" != "" || "<?php Print($m); ?>" != "" || "<?php Print($p); ?>" != ""){
            var q = "<?php Print($q); ?>";  // Copying php vars to js
            var m = "<?php Print($m); ?>";
            var p = "<?php Print($p); ?>";
            window.__INITIAL_STATE__ = {
                q: q,
                m: m,
                p: parseInt(p, 10)
            }
        }
    </script>

    <script src="app.js"></script> <!-- Link to Vue JS -->
</body>
</html>