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
        <div id="form">
            <input @input="searchInputHandler" @keyup.enter.native="submit" id="searchbox" />
            <table id="radioBtns">
                <tr>
                    <td><input type="radio" name="searchType" value="repo" id="repo" @input="onRadioChange($event)" checked><label for="repo">Repositories</label></td>
                    <td><input type="radio" name="searchType" value="iss" id="iss" @input="onRadioChange($event)"><label for="iss">Issues</label></td>
                    <td><input type="radio" name="searchType" value="usrs" id="usrs" @input="onRadioChange($event)"><label for="usrs">Users</label></td>
                </tr>
            </table>
            <button @click="submit">Search</button>
        </div>
        <p v-if="this.total > 0" id="total">{{ total }} results</p>
        <p v-if="notexterr" class="err">Please Enter Some Text</p>

        <div id="resultsDiv">

            <!-- Repo -->
            <div v-for="item in resultList" class="itemrow" v-if="this.currentm == 'repo'">
                <div class="userrow">
                    <a v-bind:href="item.html_url"><p class="title">{{ item.full_name }}</p></a>
                    <a v-bind:href="item.owner.html_url"><p class="name">{{ item.owner.login }}</p></a>
                    <div class="statsbox">
                        <p class="stats stars">Stars: {{ item.stargazers_count }}</p>
                        <p class="stats watch">Watchers: {{ item.watchers }}</p>
                        <p class="stats forks">Forks: {{ item.forks }}</p>
                    </div>
                </div>
                <p class="bio">{{ item.description }}</p>
            </div>

            <!-- Iss -->
            <div v-for="item in resultList" class="itemrow" v-if="this.currentm == 'iss'">
                <div class="userrrow">
                    <a v-bind:href="item.html_url"><p class="title">{{ item.title }}</p></a>
                    <p class="name">Posted by: <a v-bind:href="item.user.html_url">{{ item.user.login }}</a></p>
                    <p class="name">Repository: <a v-bind:href="item.repo_html_url">{{ item.full_name }}</a></p>
                </div>
            </div>

            <!-- Usrs -->
            <div v-for="item in resultList" class="itemrow" v-if="this.currentm == 'usrs'">
                <div class="userrow">
                    <a v-bind:href="item.html_url"><img v-bind:src="item.avatar_url" class="avatar"/></a>
                    <a v-bind:href="item.html_url"><p class="title">{{ item.login }}</p></a>
                    <p class="name">{{ item.name }}</p>
                    <p class="followercount"> Followers: {{ item.followers }}</p>
                </div>
                <p class="bio">{{ item.bio }}</p>
            </div>
        </div>

        <div id="footer" v-if="displayFooter">
            <!-- Pagination -->
            <p id="pagination"><a>{{paginationFoot[0]}}</a> <a>{{paginationFoot[1]}}</a> <a>{{paginationFoot[2]}}</a> <a>{{paginationFoot[3]}}</a> <a>{{paginationFoot[4]}}</a> <a>{{paginationFoot[5]}}</a> <a>{{paginationFoot[6]}}</a></p>
        </div>
    </div>




    <?php
        error_reporting( error_reporting() & ~E_NOTICE ); // remove notice that vars are undefined
        $q = $_GET['q'];
        $m = $_GET['m'];
        $p = $_GET['p'];
    ?>
    <script>
        // checks if any are null
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