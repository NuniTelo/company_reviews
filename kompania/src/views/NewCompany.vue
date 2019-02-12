<template>
    <form id="demo">

    <input type="text" v-model="emri" placeholder="Emri Kompanise">
    <br/>
    <br/>
    <input type="text" v-model="faqja" placeholder="Faqja e internetit">
    <br/>
    <br/>
    <input type="text" v-model="logo" placeholder="Logo Kompanise">
    <br/>
    <br/>
    <textarea v-model="pershkrim" placeholder="Pershkrim mbi kompanine"></textarea>
    <br/>
    <br/>
    <b-button variant="primary" @click="postNewCompany">Posto kompani</b-button>

</form>

</template>

<script>
import axios from 'axios'
export default {
    name:'NewCompany',
    data: function() {
        return {
            emri: '',
            faqja: '',
            logo: '',
            pershkrim: '',
            pergjigje:''
        }
    },
    methods : {
        postNewCompany() {
            alert('data')
            axios.post(
                'http://localhost:3000/newCompany',
                { 'cmp_name':this.emri, 'cmp_descp':this.pershkrim, 'cmp_url':this.faqja, 'cmp_icon':this.logo },
                { headers: { 'Content-Type': 'application/json' } }
                ).then(response => {
                    this.pergjigje = response.data
                    if(this.pergjigje.saved ===true ){
                        alert("Saved")
                    }
                    else {
                        alert('Not saved')
                    }
             })
        }
    }
    
}
</script>

</style>

