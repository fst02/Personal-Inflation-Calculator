<template>
  <div>
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
            <div class="pretty p-switch mb-0 float-md-right float-left">
              <input @change="modifyCategory" type="checkbox" v-model="category.active" />
              <div class="state p-info ">
                <label>Be-/kikapcsolás</label>
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
      <b-row no-gutters align-h="start" cols="1" cols-md="2">
        <b-col md="6">
          <b-card-img
            :src="imagePath"
            alt="Card image"
            class="cardImage"
          />
        </b-col>
        <b-col>
          <b-card-body>
            <b-card-text>
              <b-input-group
                class="mr-1 p-0"
                prepend="Súly:"
                :append="weightType === 'percentage' ? '%' : 'Ft' "
              >
                <b-form-input
                  v-if="weightType === 'percentage'"
                  @input="setTimer"
                  type="number"
                  v-model="category.userCategory.percentage"
                />
                <b-form-input
                  v-if="weightType === 'amount'"
                  @input="setTimer"
                  type="number"
                  v-model="category.userCategory.amount"
                />
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
</template>

<script>
import CategoryDto from '../dtos/CategoryDto';

export default {
  name: 'CategoryComponent',
  props: {
    category: CategoryDto,
    weightType: String,
  },
  data: () => ({ typingTimer: null }),
  computed: {
    imagePath() {
      return `${process.env.VUE_APP_API_ENDPOINT}/images/${this.category.imagePath}`;
    },
  },
  methods: {
    modifyCategory() {
      if (this.$store.state.auth.user) {
        this.$store.dispatch('categories/setUserSpecific', this.category.userCategory);
      }
    },
    setTimer() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.modifyCategory();
      }, 2000);
    },
  },
};
</script>
