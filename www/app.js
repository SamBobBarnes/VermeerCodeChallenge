// Vue
const app = Vue.createApp({
    data() {
        return {
            searchQueryURL: 'https://api.github.com/',
            resultList: [],
            total: 0,
            notexterr: false,
            p: 1,
            q: "sam",
            m: "usrs",
            currentm: "usrs",
            per_page:30,
            radioList: ["repo","iss","usrs"],
            numPages: 0,
            displayFooter: false,
            pageNums: ""
        }
    },
    methods: {
        search: function () {
            this.resultList = []        // Clear result
            this.total = 0      // Clear total so it disapears
            this.displayFooter = false;
            if(this.q.replace(/\s/g, '').length){   // make sure q is not only whitespace
                this.buildUrl()
                this.getResult(this.searchQueryURL)
                this.notexterr = false
                this.pageNums = this.returnPageNums() // sets page nums for footer

            }
            else {this.notexterr = true}    // Visible if no text was entered
        },
        getResult: async function (url) {      // Get data from API
            const headers = {
                "Authorization" : `Token b4c09a3d0c286f541da69addfa4fcfa5f0a74365`
            } //personal authentication token

            const response = await fetch(url, {     // This is taken from a tutorial on oauth
                "method": "GET",
                "headers": headers
            })
            const result = await response.json()
            //console.log(result)
            this.total = result.total_count // returns total num of results
            this.numPages = this.returnPageNum(result.total_count) // counts the number of pages needed
            result.items.forEach(i=>{   // add each item to result
                this.resultList.push(i)
                if(this.m == "usrs") this.getUserInfo(i.login,this.resultList.length-1) // add items from different page to results json
                if(this.m == "iss") this.getIssueInfo(i.repository_url,this.resultList.length-1) // add items from different page to results json
            })
        },
        searchInputHandler: function (){    // writes searchbox value to var in realtime
            this.q = document.getElementById("searchbox").value
        },
        submit: function (){  // submit form
            const data = {
                q: this.q,  // input
                m: this.m,  // repo, iss, usrs
                p: 1    // page number
            }
            this.sendForm(data)
        },
        submitPage: function (nb){  // submit form
            var newPage
            if(nb) newPage = this.p + 1
            else newPage = this.p - 1
            const data = {
                q: this.q,  // input
                m: this.m,  // repo, iss, usrs
                p: newPage    // page number
            }
            this.sendForm(data)
        },
        sendForm: async function (data){    // send request to php
            const href = "?q=" + data.q.replace(/\s/g, "%20") + "&m=" + data.m + "&p=" + data.p
            window.location.href = href
        },
        onRadioChange: function (e) {   // change m when radio buttons change
            this.m = e.srcElement.value
        },
        buildUrl: function () { // builds the href for the API request
            var query = ""
            switch(this.m){ // Add search function
                case "repo":
                    query += "search/repositories?q="
                    break
                case "iss":
                    query += "search/issues?q="
                    break
                case "usrs":
                    query += "search/users?q="
                    break
            }
            query += this.q
            query += "&per_page=" + this.per_page // add page length
            query += "&page=" + this.p // add page number
            query += "&accept=application/vnd.github.v3+json"
            this.searchQueryURL += query

        },
        returnPageNum: function (total) {   // counts total number of pages
            if(total > 1000){
                return Math.ceil(1000 / this.per_page)
            } else {
                return Math.ceil(total / this.per_page)
            }

        },
        getUserInfo: async function (user, i) {      // Get follower data from API

            const headers = {
                "Authorization" : `Token b4c09a3d0c286f541da69addfa4fcfa5f0a74365`
            }
            var url = "https://api.github.com/users/" + user
            const response = await fetch(url, {
                "method": "GET",
                "headers": headers
            })
            const result = await response.json()

            const name = result.name
            const bio = result.bio
            const followers =  result.followers
            this.resultList[i].name = name
            this.resultList[i].bio = bio
            this.resultList[i].followers = followers
        },
        getIssueInfo: async function (url, i) {      // Get issue data from API

            const headers = {
                "Authorization" : `Token b4c09a3d0c286f541da69addfa4fcfa5f0a74365`
            }

            const response = await fetch(url, {
                "method": "GET",
                "headers": headers
            })
            const result = await response.json()

            const full_name = result.full_name
            const html_url = result.html_url
            this.resultList[i].full_name = full_name
            this.resultList[i].repo_html_url = html_url
        },
        returnPageNums: function() {    // sets item range for footer
            var num1 = ""
            var num2 = ""

            num1 = (this.p-1) * this.per_page + 1
            num2 = this.p * this.per_page

            var result = num1 + " - " + num2
            return result

        },
        backBtnHandler: function() {    // handles back button
            this.submitPage(false)
        },
        nextBtnHandler: function() {    // handles next button
            this.submitPage(true)
        },
    },

    mounted() {
        if(window.__INITIAL_STATE__ === undefined){}
        else {
            this.q = window.__INITIAL_STATE__.q     // Load GET from web address
            this.currentm = window.__INITIAL_STATE__.m
            this.m = window.__INITIAL_STATE__.m
            this.p = window.__INITIAL_STATE__.p
            //console.log(this.q + " " + this.p + " " + this.m)
            this.search()
            document.getElementById("searchbox").value = this.q // sets current q value to searchbox value
            for(var i = 0; i < this.radioList.length; i++) {    // checks the radio button for the current mode
                if (this.m == this.radioList[i]){
                    document.getElementById(this.radioList[i]).checked = true;
                }
                else {
                    document.getElementById(this.radioList[i]).checked = false;
                }
            }
            this.displayFooter = true   // displays footer buttons

        }
    }
})


app.mount('#app')