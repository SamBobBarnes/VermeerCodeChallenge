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
            per_page: 2,
            radioList: ["repo","iss","usrs"],
            numPages: 0,
            paginationFoot: ["1","2","3","4","5","...","30"],
            displayFooter: false
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
            }
            else {this.notexterr = true}    // Visible if no text was entered
        },
        getResult: async function (url) {      // Get data from API
            const headers = {
                "Authorization" : `Token b4c09a3d0c286f541da69addfa4fcfa5f0a74365`
            }

            const response = await fetch(url, {
                "method": "GET",
                "headers": headers
            })
            const result = await response.json()
            //console.log(result)
            this.total = result.total_count // returns total num of results
            this.numPages = this.returnPageNum(result.total_count) // counts the number of pages needed
            this.buildPagination()
            result.items.forEach(i=>{   // add each item to result
                this.resultList.push(i)
                if(this.m == "usrs") this.getUserInfo(i.login,this.resultList.length-1)
                if(this.m == "iss") this.getIssueInfo(i.repository_url,this.resultList.length-1)
            })
        },
        searchInputHandler: function (){
            this.q = document.getElementById("searchbox").value
        },
        submit: function (){  // submit form
            const data = {
                q: this.q,  // input
                m: this.m,  // repo, iss, usrs
                p: this.p    // page number
            }
            this.sendForm(data)
        },
        sendForm: async function (data){    // send request to php
            const href = "?q=" + data.q.replace(/\s/g, "%20") + "&m=" + data.m + "&p=" + data.p
            window.location.href = href
        },
        onRadioChange: function (e) {
            this.m = e.srcElement.value
        },
        buildUrl: function () {
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
        returnPageNum: function (total) {
            return Math.ceil(1000 / this.per_page)
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
        getIssueInfo: async function (url, i) {      // Get follower data from API

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
        buildPagination: function () {

            // digit 1
            this.paginationFoot[0] = 1

            // digit 2
            if(this.p <= 4) {
                this.paginationFoot[1] = 2
            } else {
                this.paginationFoot[1] = "..."
            }

            // digit 3
            if(this.p < 3) {
                this.paginationFoot[2] = 3
            } else if(this.p >= this.numPages - 2) {
                this.paginationFoot[2] = this.numPages - 4
            } else {
                this.paginationFoot[2] = this.p - 1
            }

            // digit 4
            if(this.p >= 4 && this.p <= this.numPages - 3) {
                this.paginationFoot[3] = this.p
            } else if(this.p < 3) {
                this.paginationFoot[3] = 4
            } else if(this.p > this.numPages - 3) {
                this.paginationFoot[3] = this.numPages - 3
            }

            // digit 5
            if(this.p > this.numPages - 2) {
                this.paginationFoot[4] = this.numPages - 2
            } else if(this.p < 3) {
                this.paginationFoot[4] = 5
            } else {
                this.paginationFoot[4] = this.p + 1
            }

            // digit 6
            if(this.p > this.numPages - 4) {
                this.paginationFoot[5] = this.numPages - 1
            } else {
                this.paginationFoot[5] = "..."
            }

            // digit 7
            this.paginationFoot[6] = this.numPages
        }
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
            document.getElementById("searchbox").value = this.q
            for(var i = 0; i < this.radioList.length; i++) {
                if (this.m == this.radioList[i]){
                    document.getElementById(this.radioList[i]).checked = true;
                }
                else {
                    document.getElementById(this.radioList[i]).checked = false;
                }
            }
            this.displayFooter = true

        }
    }
})


app.mount('#app')