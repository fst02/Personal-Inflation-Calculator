<template>
  <div>
    <div v-for="category in categories" :key="category.id">
      <b-card
        header-tag="header"
        class="mb-3"
        no-body
      >
        <template v-slot:header>
          <b-row align-v="center" cols="1" cols-md="2">
            <b-col>
              <h5 class="mb-0 text-left my-auto">{{category.name}}</h5>
            </b-col>
            <b-col>
                <p class="mb-0 float-md-right float-left">Be-/kikapcsolás</p>
                <b-form-checkbox
                  switch
                  class="mr-1 float-md-right float-left"
                  v-model="category.active"
                />
            </b-col>
          </b-row>
        </template>
        <b-row no-gutters align-h="start" cols="1" cols-md="2">
          <b-col md="6">
            <b-card-img
              :src="`/images/image-${category.categoryId}.jpg`"
              alt="Card image"
              class="cardImage"
            />
          </b-col>
          <b-col>
            <b-card-body>
              <b-card-text>
                <b-input-group class="mr-1 p-0" prepend="Súly:">
                  <b-form-input type="number" v-model="category.weight" />
                </b-input-group>
                <h6 class="mt-2 font-weight-bold">Alkategóriák:</h6>
                <b-row align-v="center" class="ml-0">
                  <b-form-checkbox switch class="mr-1 text-left"/>
                  <h6 class="mb-0 text-left">Alkategória 1</h6>
                </b-row>
                <b-row align-v="center" class="ml-0">
                  <b-form-checkbox switch class="mr-1 text-left"/>
                  <h6 class="mb-0 text-left">Alkategória 2</h6>
                </b-row>
                <b-row align-v="center" class="ml-0">
                  <b-form-checkbox switch class="mr-1 text-left"/>
                  <h6 class="mb-0 text-left">Alkategória 3</h6>
                </b-row>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardsComponent',
  props: {
    categories: Array,
  },
};
</script>
