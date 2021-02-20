// Vue
const app = Vue.createApp({
    data() {
        return {
            searchQueryURL: 'https://api.github.com/search/users?q=',
            result: [],
            total: 0,
            notexterr: false,
            p: 0,
            q: "",
            m: "usrs",
        }
    },
    methods: {
        search: function () {
            this.result = []        // Clear result
            this.total = 0      // Clear total so it disapears
            if(this.q.replace(/\s/g, '').length){   // make sure q is not only whitespace
                this.getResult(this.searchQueryURL + this.q)
                this.notexterr = false
            }
            else {this.notexterr = true}    // Visible if no text was entered

        },
        getResult: async function (url) {      // Get data from API
            const response = await fetch(url)
            const result = await response.json()
            console.log(result)
            this.total = result.total_count
            result.items.forEach(i=>{   // add each item to result
                this.result.push(i)
            })
        },
        searchInputHandler: function (){
            this.q = document.getElementById("searchbox").value
        },
        submit: function (){  // submit form
            const data = {
                q: this.q,  // input
                m: this.m,  // repo, code, comm, iss, disc, pkgs, mkt, topic, wiki, usrs
                p: this.p    // page number
            }
            this.sendForm(data)
        },
        sendForm: async function (data){    // send request to php
            const href = "index.php?q=" + data.q.replace(/\s/g, "%20") + "&m=" + data.m + "&p=" + data.p
            window.location.href = href
        }
    },

    mounted() {
        if(window.__INITIAL_STATE__ === undefined){}
        else {
            this.q = window.__INITIAL_STATE__.q     // Load GET from web address
            this.m = window.__INITIAL_STATE__.m
            this.p = window.__INITIAL_STATE__.p
            console.log(this.q + " " + this.p + " " + this.m)
        this.search()
        document.getElementById("searchbox").value = this.q
        }
    }
})


app.mount('#app')