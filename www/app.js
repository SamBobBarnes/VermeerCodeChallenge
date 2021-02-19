//const searchQueryURL = 'https://api.github.com/search/users?q=sambobbarnes'; //https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}








// Vue
const app = Vue.createApp({
    data() {
        return {
            searchQueryURL: 'https://api.github.com/search/users?q=sambobbarnes',
            result: []
        }
    },
    methods: {
        search: function() {
            this.getResult()
        },
        getResult: async function () {
            const response = await fetch(this.searchQueryURL)
            const result = await response.json()
            console.log(result)
            result.items.forEach(i=>{
                this.result.push(i)
            })
        }
    }
})

app.mount('#app')