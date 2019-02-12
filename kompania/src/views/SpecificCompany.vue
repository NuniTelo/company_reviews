<template>
    <div class ="specific">
        <b-button variant="primary" @click="$router.go(-1)" > <- Mbrapa </b-button>
        <h1>Emri i kompanise: {{companyData.company_name}}</h1>
         <h4>Pershkrimi : {{companyData.company_description}}</h4>
         <img  :src="companyData.company_icon">
         
          <h3> KOMENTET </h3>
         <b-btn v-b-modal.modalPrevent variant = "success">Shto koment</b-btn>

    <!-- Modal Component -->
    <b-modal id="modalPrevent"
             ref="modal"
             title="Submit your name"
             @ok="handleOk"
             @shown="clearName">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text"
                      placeholder="Emri"
                      v-model="emri"></b-form-input>
       <b-form-input type="text"
                      placeholder="Pozicioni ne te cilin keni punuar"
                      v-model="pozicioni"></b-form-input>
       <b-form-input type="text"
                      placeholder="Komenti juaj pro"
                      v-model="komentePro"></b-form-input>
       <b-form-input type="text"
                      placeholder="Komenti juaj kundra"
                      v-model="komenteKundra"></b-form-input>
                       <b-form-input type="text"
                      placeholder="Vleresim 1-5"
                      v-model="vleresim"></b-form-input>
                       <b-form-input type="text"
                      placeholder="Komenti juaj final"
                      v-model="komentFinal"></b-form-input>
      
      </form>
    </b-modal>
    
          <div  v-for="komenti in companyData.company_review" :key = "komenti._id">
              <hr/>
              <p><strong>Postuesi : {{komenti.review_from}}</strong></p>
              <p><strong>Pozicioni : {{komenti.review_from_position}}</strong></p>
              <p><strong>Komente Pro : {{komenti.review_pro}}</strong></p>
              <p><strong>Komente Kundra : {{komenti.review_against}}</strong></p>
              <p><strong>Vleresimi : {{komenti.review_rating}}</strong></p>
              <p><strong>Komenti final : {{komenti.review_final_comment}}</strong></p>
               <hr/>
        </div>  
    </div>
</template>

<script>
import axios from 'axios' 

export default {
    name:'SpecificCompany',
    data : function() {
        return {
            companyData: [],
            id : '',
            emri: '',
            pozicioni: '',
            komentePro: '',
            komenteKundra: '',
            vleresim:'',
            komentFinal: ''

        }
      
    },
     created: function() {
            this.id = this.$route.params.id;
             axios.get('http://localhost:3000/specificCompany/' + this.id)
                .then(response => {
                 this.companyData = response.data[0]
          })

    },
    methods: {
    clearName () {
      this.emri = ''
      this.pozicioni = ''
      this.komentePro = ''
      this.komenteKundra = ''
      this.vleresim = ''
      this.komentFinal = ''
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.emri || !this.komentePro || !this.komenteKundra || !this.vleresim) {
        alert('Plotesoni te gjitha fushat!')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      const komentFront = {
          _id: this.emri+this.pozicioni,
          date : new Date(),
          review_from : this.emri,
          review_from_position: this.pozicioni,
          review_pro:this.komentePro,
          review_against:this.komenteKundra,
          review_rating:this.vleresim,
          review_final_comment:this.komentFinal
      }

      const komentBack = {
          date:new Date(),
          rf:this.emri,
          rff:this.pozicioni,
          rp:this.komentePro,
          ra:this.komenteKundra,
          rr:this.vleresim,
          rfc:this.komentFinal
      }
     
      this.companyData.company_review.unshift(komentFront);
       axios.post(
                'http://localhost:3000/newComment',
                {"id":this.companyData._id ,"comment" : komentBack},
                { headers: { 'Content-Type': 'application/json' } })
      this.clearName()
      this.$refs.modal.hide()
    }
  }
}
</script>


