<template>
<div class = "companies">
     <b-button variant = "primary " router-link to="/newCompany">Shto Kompani</b-button>
     <br/>
      <br/>
 <div class="row">
    <div class="col-md-4" v-for="(post, index) in postimet">
          <div class="card h-100">
            <img class="card-img-top" :src="post.company_icon">
            <div class="card-body">
              <h3 class="card-title">Kompania: {{post.company_name}}</h3>
              <h6 class="card-text">Pershkrim: {{post.company_description}}</h6>
            <b-button router-link :to="{ name: 'SpecificCompany', params: { id: post._id } }" variant="primary">Komente...</b-button>
            </div>
          </div>
     </div>
 </div>

    </div>

</template>

<script>
import axios from 'axios';

export default {
    name : "companies" , 
    data: function () {
        return {
            postimet : [],
            errors : []
         }
    },
     created : function () {
        axios.get('http://localhost:3000/allCompanies')
        .then(response => {
             this.postimet = response.data
         })
         .catch(e => {
            this.errors.push(e)
     })
    
    }
}
</script>

<style scoped> 

ul {
  list-style-type: none;
}

.card-img-top{
  width:100%;
  height:auto;
}
.col-md-4{
    margin-bottom: 40px
}

</style>